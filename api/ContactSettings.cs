namespace StanislavMatzke.Api;

/// <summary>Configuration from environment variables (Azure portal → Static Web App → Environment variables).</summary>
public sealed record ContactSettings(
    string? AcsConnectionString,
    string From,
    string To,
    IReadOnlySet<string> AllowedOrigins,
    int PerClientPerHour,
    int PerDay)
{
    private const string Site = "https://stanislavmatzke.com";

    public static ContactSettings FromEnvironment()
    {
        static string? Env(string name) => Environment.GetEnvironmentVariable(name) is { Length: > 0 } v ? v : null;
        static int Int(string name, int fallback) => int.TryParse(Env(name), out var v) && v > 0 ? v : fallback;

        var origins = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { Site, "https://www.stanislavmatzke.com" };
        foreach (var o in (Env("CONTACT_ALLOWED_ORIGINS") ?? "").Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
            origins.Add(o.TrimEnd('/'));

        return new ContactSettings(
            Env("CONTACT_ACS_CONNECTION_STRING"),
            Env("CONTACT_FROM") ?? "kontakt@stanislavmatzke.com",
            Env("CONTACT_TO") ?? "kontakt@stanislavmatzke.com",
            origins,
            Int("CONTACT_LIMIT_PER_HOUR", 3),
            Int("CONTACT_LIMIT_PER_DAY", 30));
    }

    /// <summary>Only the website itself may post the form (browsers always send Origin with a POST).</summary>
    public bool IsAllowedOrigin(string? origin) => origin is not null && AllowedOrigins.Contains(origin.TrimEnd('/'));
}
