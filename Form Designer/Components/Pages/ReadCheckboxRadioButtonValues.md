@page "/read-checkbox-radiobutton-values"
@using Syncfusion.Blazor.SfPdfViewer
@using Syncfusion.Blazor.Buttons

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
</SfPdfViewer2>

<SfButton @onclick="ReadCheckboxValues">Read Checkbox Values</SfButton>

@code {
    private SfPdfViewer2? viewer;
    private string DocumentPath = "wwwroot/data/form-document.pdf";

    private async Task ReadCheckboxValues()
    {
        if (viewer == null) return;
        var formFields = await viewer.GetFormFieldsAsync();
        var radioButtons = formFields.OfType<RadioButtonField>().Where(field => field.Name == "gender").ToList();
        var checkedField = radioButtons.FirstOrDefault(field => field.IsSelected);
        string fieldName = checkedField?.Name ?? string.Empty;
        Console.WriteLine($"Selected radio button: {fieldName}");
    }
}
