using Microsoft.Extensions.Logging;
using MauiApp_Android.Data;
using Syncfusion.Blazor;

namespace MauiApp_Android;

public static class MauiProgram
{
	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder
			.UseMauiApp<App>()
			.ConfigureFonts(fonts =>
			{
				fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
			});

		builder.Services.AddMauiBlazorWebView();
        builder.Services.AddMemoryCache();


#if DEBUG
        builder.Services.AddBlazorWebViewDeveloperTools();
		builder.Logging.AddDebug();
#endif
        //Directory.SetCurrentDirectory(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "wwwroot"));
        builder.Services.AddSingleton<WeatherForecastService>(); 
        builder.Services.AddSyncfusionBlazor();
        Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("MDAxQDMyMzIyZTMwMmUzMGZtcFNDblZWekpVYWRuS3VLMFN1cXh3VHhWcktjMkZpUktVZDhjNlpQeXc9");

        return builder.Build();
	}
}
