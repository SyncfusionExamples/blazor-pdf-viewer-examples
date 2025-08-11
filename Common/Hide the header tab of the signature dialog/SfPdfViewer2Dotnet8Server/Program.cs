using SfPdfViewer2Dotnet8Server.Components;
using Syncfusion.Blazor;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents()
.AddHubOptions(o => {
    o.KeepAliveInterval = TimeSpan.FromMinutes(2);
    o.ClientTimeoutInterval = TimeSpan.FromMinutes(2); o.MaximumReceiveMessageSize = 10240000000;
});
builder.Services.AddSignalR(e =>
{
    e.MaximumReceiveMessageSize = 1024000000000; // 100 MB
});
builder.Services.AddMemoryCache();
//Add Syncfusion Blazor service to the container.
builder.Services.AddSyncfusionBlazor();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}


app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseAntiforgery();

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();
