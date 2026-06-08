@page "/update-textbox"
@using Syncfusion.Blazor.SfPdfViewer
@using Syncfusion.Blazor.Buttons

<SfButton @onclick="OnEditTextbox">Apply Textbox Changes</SfButton>

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
</SfPdfViewer2>

@code {
    private SfPdfViewer2? viewer;
    private string DocumentPath = "wwwroot/data/form-designer.pdf";

    private async Task OnEditTextbox()
    {
        if (viewer == null) return;

        List<FormFieldInfo> fields = await viewer.GetFormFieldsAsync();
        
        var field = fields?.FirstOrDefault(f => f.Name == "FirstName");
        
        if (field != null)
        {
            (field as TextBoxField).Value = "John";
            field.FontFamily = "Courier";
            field.FontSize = 12;
            field.Color = "black";
            field.BackgroundColor = "white";
            field.BorderColor = "black";
            field.Thickness = 2;
            field.TextAlignment = TextAlignment.Left;

            await viewer.UpdateFormFieldsAsync(new List<FormFieldInfo> { field });
        }
    }
}
