@page "/apply-form-field-flags"
@using Syncfusion.Blazor.SfPdfViewer

<!-- PDF Viewer component with reference binding and document loading -->
<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
    <PdfViewerEvents DocumentLoaded="@OnDocumentLoaded"></PdfViewerEvents>
</SfPdfViewer2>

@code {
    // Reference to the PDF Viewer instance
    private SfPdfViewer2? viewer;

    // Path to the PDF document to be loaded in the viewer
    private string DocumentPath = "wwwroot/data/Form_Designer.pdf";

    // Method triggered when the document is loaded
    private async Task OnDocumentLoaded()
    {
        if (viewer == null) return;

        List<FormFieldInfo> formFields = new List<FormFieldInfo>
        {
            // Read-only Textbox that is not required
            new TextBoxField
            {
                Name = "EmployeeId",
                Bounds = new Bound { X = 146, Y = 229, Width = 150, Height = 24 },
                IsReadOnly = true,
                IsRequired = false,
                Value = "EMP-0001"
            },
            // Required Signature field
            new SignatureField
            {
                Name = "ApplicantSign",
                Bounds = new Bound { X = 57, Y = 923, Width = 200, Height = 43 },
                IsReadOnly = false,
                IsRequired = true,
                TooltipText = "Sign to accept the terms"
            }
        };

        await viewer.AddFormFieldsAsync(formFields);
    }
}
