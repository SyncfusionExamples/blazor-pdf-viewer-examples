@page "/add-signature"
@using Syncfusion.Blazor.SfPdfViewer

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
    <PdfViewerEvents DocumentLoaded="@AddSignatureField"></PdfViewerEvents>
</SfPdfViewer2>

@code {
    private SfPdfViewer2 viewer;
    private string DocumentPath = "wwwroot/data/form-filling-document.pdf";

    private async Task AddSignatureField()
    {
        // Create a signature field
        SignatureField signatureField = new SignatureField()
        {
            Name = "Sign",
            Bounds = new Bound() { X = 57, Y = 923, Width = 200, Height = 43 },
            TooltipText = "sign Here",
            IsRequired = true
        };

        // Add the signature field to the PDF document
        await viewer.AddFormFieldsAsync(new List<FormFieldInfo> { signatureField });
    }
}
