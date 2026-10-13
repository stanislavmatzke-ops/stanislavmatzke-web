using Azure;
using Azure.Communication.Email;
using Microsoft.Extensions.Logging;

namespace StanislavMatzke.Api;

public interface IContactMailer
{
    Task SendAsync(ContactMessage message, CancellationToken ct);
}

/// <summary>
/// Sends the message to my own mailbox via Azure Communication Services. Reply-To is the visitor, so "Reply" just works.
/// Deliberately no confirmation e-mail to the visitor – otherwise the form could be abused to send mail to anyone.
/// </summary>
public sealed class AcsContactMailer(EmailClient client, ContactSettings settings, ILogger<AcsContactMailer> logger) : IContactMailer
{
    public async Task SendAsync(ContactMessage m, CancellationToken ct)
    {
        var subject = $"Web: {m.Name}{(m.Company is null ? "" : $" ({m.Company})")}";
        if (subject.Length > 150) subject = subject[..150];

        var text = $"""
            Nová zpráva z kontaktního formuláře na stanislavmatzke.com ({m.Lang.ToUpperInvariant()})

            Jméno:  {m.Name}
            E-mail: {m.Email}
            Firma:  {m.Company ?? "–"}

            {m.Message}
            """;

        var mail = new EmailMessage(settings.From, settings.To, new EmailContent(subject) { PlainText = text });
        mail.ReplyTo.Add(new EmailAddress(m.Email, m.Name));

        // WaitUntil.Started: ACS queues the message, the visitor does not wait for the mail server.
        await client.SendAsync(WaitUntil.Started, mail, ct);
        logger.LogInformation("Contact message from {Email} queued", Mask.Email(m.Email));
    }
}

/// <summary>
/// No connection string configured: nothing can be sent. Fail loudly so the visitor sees an error (with my e-mail
/// address) instead of a false "message arrived".
/// </summary>
public sealed class LogContactMailer(ILogger<LogContactMailer> logger) : IContactMailer
{
    public Task SendAsync(ContactMessage m, CancellationToken ct)
    {
        logger.LogError("CONTACT_ACS_CONNECTION_STRING is not set – message from {Email} NOT sent", Mask.Email(m.Email));
        throw new InvalidOperationException("E-mail sending is not configured (CONTACT_ACS_CONNECTION_STRING).");
    }
}

public static class Mask
{
    /// <summary>"jana.novakova@example.com" → "j***@example.com" – no full addresses in the logs.</summary>
    public static string Email(string address)
    {
        var at = address.IndexOf('@');
        return at <= 0 ? "***" : $"{address[0]}***{address[at..]}";
    }
}
