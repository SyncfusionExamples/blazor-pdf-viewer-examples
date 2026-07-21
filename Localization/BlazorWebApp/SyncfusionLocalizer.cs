using Syncfusion.Blazor;
using System.Resources;

public class SyncfusionLocalizer : ISyncfusionStringLocalizer
{

    private readonly ResourceManager resourceManager =
        new ResourceManager(
            "BlazorWebApp.Resources.SfResources",
            typeof(SyncfusionLocalizer).Assembly);
    public string GetText(string key)
    {
        return resourceManager.GetString(key) ?? key;
    }
    public ResourceManager ResourceManager => resourceManager;
}