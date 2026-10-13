namespace StanislavMatzke.Api;

/// <summary>
/// Rate limiting against inbox flooding: a few messages per client per hour and a daily cap for the whole site.
/// Kept in memory – enough for a personal site (a restart resets it, several instances each count separately);
/// the daily cap is the hard stop that limits the worst case.
/// </summary>
public sealed class AbuseGuard(ContactSettings settings, TimeProvider time)
{
    private readonly Lock _gate = new();
    private readonly Dictionary<string, List<DateTimeOffset>> _perClient = new();
    private DateOnly _day;
    private int _today;

    public enum Verdict { Allowed, ClientLimit, DailyLimit }

    public Verdict TryAcquire(string client)
    {
        var now = time.GetUtcNow();
        lock (_gate)
        {
            var day = DateOnly.FromDateTime(now.UtcDateTime);
            if (day != _day) { _day = day; _today = 0; }
            if (_today >= settings.PerDay) return Verdict.DailyLimit;

            // forget anything older than an hour (also keeps the dictionary small)
            foreach (var key in _perClient.Keys.ToList())
            {
                _perClient[key].RemoveAll(t => now - t > TimeSpan.FromHours(1));
                if (_perClient[key].Count == 0) _perClient.Remove(key);
            }

            if (!_perClient.TryGetValue(client, out var hits)) _perClient[client] = hits = [];
            if (hits.Count >= settings.PerClientPerHour) return Verdict.ClientLimit;

            hits.Add(now);
            _today++;
            return Verdict.Allowed;
        }
    }
}
