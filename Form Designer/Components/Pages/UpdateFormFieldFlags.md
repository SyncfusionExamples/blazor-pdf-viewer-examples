@page "/update-form-field-flags"
@using Syncfusion.Blazor.SfPdfViewer

<!-- PDF Viewer component with reference binding and document loading -->
<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
    <PdfViewerEvents DocumentLoaded="@OnDocumentLoaded"></PdfViewerEvents>
</SfPdfViewer2>

@code {
    // Reference to the PDF Viewer instance
    private SfPdfViewer2? viewer;

    // Path to the PDF document to be loaded in the viewer
    private string DocumentPath = "wwwroot/data/form-designer.pdf";

    // Method triggered when the document is loaded
    private async Task OnDocumentLoaded()
    {
        if (viewer == null) return;

        // 1) Add a sample textbox
        var formFields = new List<FormFieldInfo>
        {
            new TextBoxField
            {
                Name = "Email",
                Bounds = new Bound { X = 146, Y = 260, Width = 220, Height = 24 }
            }
        };

        await viewer.AddFormFieldsAsync(formFields);

        // 2) Retrieve and update constraint flags
        var allFields = await viewer.GetFormFieldsAsync();
        var field = allFields.FirstOrDefault(f => f.Name == "Email");
        
        if (field is TextBoxField emailField)
        {
            emailField.IsReadOnly = false;
            emailField.IsRequired = true;
            emailField.TooltipText = "Enter a valid email";
            
            await viewer.UpdateFormFieldsAsync(new List<FormFieldInfo> { emailField });
        }
    }
}
