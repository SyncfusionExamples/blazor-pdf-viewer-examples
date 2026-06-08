@page "/add-textbox"
@using Syncfusion.Blazor.SfPdfViewer

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
    <PdfViewerEvents DocumentLoaded="@AddTextBox"></PdfViewerEvents>
</SfPdfViewer2>

@code {
    private SfPdfViewer2 viewer;
    private string DocumentPath = "wwwroot/data/form-filling-document.pdf";

    private async Task AddTextBox()
    {
        // Create a text box field with properties
        TextBoxField textBoxField = new TextBoxField()
        {
            Name = "FirstName",
            Bounds = new Bound() { X = 100, Y = 150, Width = 200, Height = 24 },
            IsRequired = true,
            TooltipText = "Enter your first name",
            MaxLength = 40
        };

        // Add the text box field to the PDF document
        await viewer.AddFormFieldsAsync(new List<FormFieldInfo> { textBoxField });
    }
}