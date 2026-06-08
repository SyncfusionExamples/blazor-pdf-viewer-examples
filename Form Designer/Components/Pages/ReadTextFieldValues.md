@page "/read-text-field-values"
@using Syncfusion.Blazor.SfPdfViewer
@using Syncfusion.Blazor.Buttons

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
</SfPdfViewer2>

<SfButton @onclick="ReadTextFields">Read Text Field</SfButton>

@code {
    private SfPdfViewer2? viewer;
    private string DocumentPath = "wwwroot/data/form-document.pdf";

    private async Task ReadTextFields()
    {
        if (viewer == null) return;
        var formFields = await viewer.GetFormFieldsAsync();
        var nameField = formFields.FirstOrDefault(field => field is TextBoxField && field.Name == "name") as TextBoxField;
        string nameValue = nameField?.Value ?? string.Empty;
        Console.WriteLine($"Name field value: {nameValue}");
    }
}
