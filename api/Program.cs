using Azure.Communication.Email;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using StanislavMatzke.Api;

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices(services =>
    {
        var settings = ContactSettings.FromEnvironment();
        services.AddSingleton(settings);
        services.AddSingleton(TimeProvider.System);
        services.AddSingleton<AbuseGuard>();

        // Without a connection string (locally) nothing is sent – the log says what would have been.
        if (settings.AcsConnectionString is { Length: > 0 } connection)
            services.AddSingleton<IContactMailer>(sp => new AcsContactMailer(
                new EmailClient(connection), settings,
                sp.GetRequiredService<Microsoft.Extensions.Logging.ILogger<AcsContactMailer>>()));
        else
            services.AddSingleton<IContactMailer, LogContactMailer>();
    })
    .Build();

host.Run();
