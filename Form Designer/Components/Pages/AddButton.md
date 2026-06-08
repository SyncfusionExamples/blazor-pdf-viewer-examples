@page "/add-button"
@using Syncfusion.Blazor.SfPdfViewer

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
    <PdfViewerEvents DocumentLoaded="@AddButtonField"></PdfViewerEvents>
</SfPdfViewer2>

@code {
    private SfPdfViewer2 viewer;
    private string DocumentPath = "wwwroot/data/Form_Filling_Document.pdf";

    private async Task AddButtonField()
    {
        // Create a button field with properties
        ButtonField buttonField = new ButtonField()
        {
            Name = "SubmitButton",
            Bounds = new Bound() { X = 100, Y = 190, Width = 150, Height = 40 },
            TooltipText = "Click to submit the form"
        };

        // Add the button field to the PDF document
        await viewer.AddFormFieldsAsync(new List<FormFieldInfo> { buttonField });
    }
}
