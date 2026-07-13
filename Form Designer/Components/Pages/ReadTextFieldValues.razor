@page "/read-text-field-values"
@using Syncfusion.Blazor.SfPdfViewer
@using Syncfusion.Blazor.Buttons

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
</SfPdfViewer2>

<SfButton @onclick="ReadTextFields">Read Text Field</SfButton>

@code {
    private SfPdfViewer2? viewer;
    private string DocumentPath = "wwwroot/data/Form_Filling_Document_With_Data.pdf";

    private async Task ReadTextFields()
    {
        if (viewer == null) return;
        List<FormFieldInfo> formFields = await viewer.GetFormFieldsAsync();
        TextBoxField? nameField = formFields.FirstOrDefault(field => field is TextBoxField && field.Name == "name") as TextBoxField;
        string nameValue = nameField?.Value ?? string.Empty;
        Console.WriteLine($"Name field value: {nameValue}");
    }
}
