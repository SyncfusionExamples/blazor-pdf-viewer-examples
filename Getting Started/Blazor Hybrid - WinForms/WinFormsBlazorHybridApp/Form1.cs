namespace WinFormsBlazorHybridApp;
using Microsoft.AspNetCore.Components.WebView.WindowsForms;
using Microsoft.Extensions.DependencyInjection;
using Syncfusion.Blazor;
using WinFormsBlazorHybridApp.Components;

public partial class Form1 : Form
{
    public Form1()
    {
        InitializeComponent();
        ServiceCollection services = new ServiceCollection();
        services.AddWindowsFormsBlazorWebView();
        services.AddMemoryCache();
        services.AddSyncfusionBlazor();
        BlazorWebView blazorWebView = new BlazorWebView()
        {
            HostPage = "wwwroot\\index.html",
            Services = services.BuildServiceProvider(),
            Dock = DockStyle.Fill
        };
        blazorWebView.RootComponents.Add<PDFViewer>("#app");
        this.Controls.Add(blazorWebView);
    }
}
