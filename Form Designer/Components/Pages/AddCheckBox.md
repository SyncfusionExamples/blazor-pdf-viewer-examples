@page "/add-checkbox"
@using Syncfusion.Blazor.SfPdfViewer

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
    <PdfViewerEvents DocumentLoaded="@AddCheckBoxField"></PdfViewerEvents>
</SfPdfViewer2>

@code {
    private SfPdfViewer2 viewer;
    private string DocumentPath = "wwwroot/data/form-filling-document.pdf";

    private async Task AddCheckBoxField()
    {
        // Create a checkbox field with properties
        CheckBoxField checkBoxField = new CheckBoxField()
        {
            Name = "AgreeTerms",
            Bounds = new Bound() { X = 100, Y = 230, Width = 18, Height = 18 },
            IsChecked = false,
            TooltipText = "I agree to the terms"
        };

        // Add the checkbox field to the PDF document
        await viewer.AddFormFieldsAsync(new List<FormFieldInfo> { checkBoxField });
    }
}
