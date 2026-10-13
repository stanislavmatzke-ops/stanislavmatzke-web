using System.Text.RegularExpressions;

namespace StanislavMatzke.Api;

/// <summary>What the form sends. Everything is untrusted input.</summary>
public sealed class ContactRequest
{
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? Company { get; set; }
    public string? Message { get; set; }

    /// <summary>Honeypot – hidden from people, bots fill it in.</summary>
    public string? Website { get; set; }

    /// <summary>How long the form was open before sending (ms). People need more than a few seconds.</summary>
    public long? ElapsedMs { get; set; }

    public string? Lang { get; set; }
}

/// <summary>A validated, normalised message ready to be e-mailed.</summary>
public sealed record ContactMessage(string Name, string Email, string? Company, string Message, string Lang);

public static partial class ContactValidator
{
    public const int MinElapsedMs = 3000;

    [GeneratedRegex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$")]
    private static partial Regex EmailPattern();

    [GeneratedRegex(@"https?://", RegexOptions.IgnoreCase)]
    private static partial Regex LinkPattern();

    /// <summary>True when the request looks like a bot: honeypot filled, sent too fast, or stuffed with links.</summary>
    public static bool LooksLikeBot(ContactRequest r) =>
        !string.IsNullOrWhiteSpace(r.Website)
        || r.ElapsedMs is null or < MinElapsedMs
        || LinkPattern().Count(r.Message ?? "") > 3;

    public static ContactMessage? Validate(ContactRequest r)
    {
        var name = SingleLine(r.Name);
        var email = SingleLine(r.Email);
        var company = SingleLine(r.Company);
        var message = (r.Message ?? "").Replace("\r\n", "\n").Trim();

        if (name.Length is < 2 or > 100) return null;
        if (email.Length > 254 || !EmailPattern().IsMatch(email)) return null;
        if (company.Length > 150) return null;
        if (message.Length is < 10 or > 5000) return null;
        if (message.Any(c => char.IsControl(c) && c is not '\n' and not '\t')) return null;

        return new ContactMessage(name, email, company.Length > 0 ? company : null, message, r.Lang == "en" ? "en" : "cs");
    }

    /// <summary>Trim and drop line breaks and control characters – nothing can break into the e-mail subject.</summary>
    private static string SingleLine(string? value) =>
        new string((value ?? "").Where(c => !char.IsControl(c)).ToArray()).Trim();
}
