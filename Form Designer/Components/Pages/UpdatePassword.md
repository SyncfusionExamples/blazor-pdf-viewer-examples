@page "/update-password"
@using Syncfusion.Blazor.SfPdfViewer
@using Syncfusion.Blazor.Buttons

<SfButton @onclick="OnEditPassword">Edit PasswordBox</SfButton>

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
</SfPdfViewer2>

@code {
    private SfPdfViewer2? viewer;
    private string DocumentPath = "wwwroot/data/form-designer.pdf";

    private async Task OnEditPassword()
    {
        if (viewer == null) return;

        List<FormFieldInfo> fields = await viewer.GetFormFieldsAsync();
        
        var field = fields?.FirstOrDefault(f => f.Name == "Password");
        
        if (field != null)
        {
            (field as PasswordField).TooltipText = "Enter your password";
            field.IsReadOnly = false;
            field.IsRequired = true;
            field.FontFamily = "Courier";
            field.FontSize = 10;
            field.Color = "black";
            field.BorderColor = "black";
            field.BackgroundColor = "white";
            field.TextAlignment = TextAlignment.Left;
            field.Thickness = 1;

            await viewer.UpdateFormFieldsAsync(new List<FormFieldInfo> { field });
        }
    }
}
