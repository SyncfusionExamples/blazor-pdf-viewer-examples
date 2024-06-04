using Customized_templated_stamp_appearance.Components;

using Syncfusion.Blazor;
using Syncfusion.Licensing;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorComponents()
        .AddInteractiveServerComponents()
        .AddHubOptions(o => { o.MaximumReceiveMessageSize = 102400000; });
SyncfusionLicenseProvider.RegisterLicense("MDAxQDMyMzUyZTMwMmUzMEI2ajd0TnQwR1NzTVNGQkdUSlBidlF6ekkwdGxJTk56N0ZGYVZjdzNyczQ9");
builder.Services.AddMemoryCache();
//Add Syncfusion Blazor service to the container.
builder.Services.AddSyncfusionBlazor();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAntiforgery();

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();
