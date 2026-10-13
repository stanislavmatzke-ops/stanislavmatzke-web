using System.Net;
using System.Text.Json;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace StanislavMatzke.Api;

/// <summary>POST /api/contact – the contact form on the website.</summary>
public sealed class ContactFunction(
    ContactSettings settings, AbuseGuard guard, IContactMailer mailer, ILogger<ContactFunction> logger)
{
    private const int MaxBodyChars = 20_000;
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web);

    [Function("contact")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "contact")] HttpRequestData req,
        CancellationToken ct)
    {
        if (!settings.IsAllowedOrigin(Header(req, "Origin")))
            return await Reply(req, HttpStatusCode.Forbidden, "origin");

        // read at most MaxBodyChars – a huge body is rejected without being parsed
        var buffer = new char[MaxBodyChars + 1];
        using var reader = new StreamReader(req.Body);
        var read = await reader.ReadBlockAsync(buffer, ct);
        if (read > MaxBodyChars) return await Reply(req, HttpStatusCode.RequestEntityTooLarge, "too-large");

        ContactRequest? body;
        try { body = JsonSerializer.Deserialize<ContactRequest>(buffer.AsSpan(0, read), Json); }
        catch (JsonException) { body = null; }
        if (body is null) return await Reply(req, HttpStatusCode.BadRequest, "invalid");

        // Bots get the same "OK" as people – they learn nothing, and nothing is sent.
        if (ContactValidator.LooksLikeBot(body))
        {
            logger.LogInformation("Contact form: bot-like request ignored");
            return await Reply(req, HttpStatusCode.Accepted, null);
        }

        var message = ContactValidator.Validate(body);
        if (message is null) return await Reply(req, HttpStatusCode.BadRequest, "invalid");

        switch (guard.TryAcquire(ClientIp(req)))
        {
            case AbuseGuard.Verdict.ClientLimit:
                return await Reply(req, HttpStatusCode.TooManyRequests, "rate");
            case AbuseGuard.Verdict.DailyLimit:
                logger.LogWarning("Contact form: daily cap of {Cap} messages reached", settings.PerDay);
                return await Reply(req, HttpStatusCode.TooManyRequests, "rate");
        }

        try
        {
            await mailer.SendAsync(message, ct);
            return await Reply(req, HttpStatusCode.Accepted, null);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Contact form: sending failed");
            return await Reply(req, HttpStatusCode.BadGateway, "send");
        }
    }

    private static async Task<HttpResponseData> Reply(HttpRequestData req, HttpStatusCode status, string? error)
    {
        var res = req.CreateResponse();
        await res.WriteAsJsonAsync(new { ok = error is null, error });
        // WriteAsJsonAsync resets the status to 200 – set the real one afterwards
        res.StatusCode = status;
        res.Headers.Add("Cache-Control", "no-store");
        return res;
    }

    private static string? Header(HttpRequestData req, string name) =>
        req.Headers.TryGetValues(name, out var values) ? values.FirstOrDefault() : null;

    /// <summary>Visitor's IP as forwarded by Static Web Apps ("1.2.3.4:5678" or "[::1]:5678" → address only).</summary>
    internal static string ClientIp(HttpRequestData req)
    {
        var raw = Header(req, "x-azure-clientip") ?? Header(req, "x-forwarded-for")?.Split(',')[0];
        raw = raw?.Trim();
        if (string.IsNullOrEmpty(raw)) return "unknown";
        if (raw.StartsWith('[')) return raw[1..Math.Max(1, raw.IndexOf(']'))];
        return raw.Count(c => c == ':') == 1 ? raw[..raw.IndexOf(':')] : raw;
    }
}
