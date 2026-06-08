@page "/read-checkbox-radiobutton-values"
@using Syncfusion.Blazor.SfPdfViewer
@using Syncfusion.Blazor.Buttons

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
</SfPdfViewer2>

<SfButton @onclick="ReadCheckboxValues">Read Checkbox Values</SfButton>

@code {
    private SfPdfViewer2? viewer;
    private string DocumentPath = "wwwroot/data/Form_Filling_Document_With_Data.pdf";

    private async Task ReadCheckboxValues()
    {
        if (viewer == null) return;
        List<FormFieldInfo> formFields = await viewer.GetFormFieldsAsync();
        List<RadioButtonField> radioButtons = formFields.OfType<RadioButtonField>().Where(field => field.Name == "gender").ToList();
        RadioButtonField? checkedField = radioButtons.FirstOrDefault(field => field.IsSelected);
        string fieldName = checkedField?.Name ?? string.Empty;
        Console.WriteLine($"Selected radio button: {fieldName}");
    }
}
