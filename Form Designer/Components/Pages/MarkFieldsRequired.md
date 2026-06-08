@page "/mark-fields-required"
@using Syncfusion.Blazor.SfPdfViewer

<!-- PDF Viewer component with reference binding and document loading -->
<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath" EnableFormFieldsValidation="true">
    <PdfViewerEvents DocumentLoaded="@OnDocumentLoaded" ValidateFormFields="@OnValidateFormFields"></PdfViewerEvents>
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

        var formFields = new List<FormFieldInfo>
        {
            new TextBoxField
            {
                Name = "Email",
                Bounds = new Bound { X = 146, Y = 260, Width = 220, Height = 24 },
                IsRequired = true,
                TooltipText = "Email is required"
            }
        };

        await viewer.AddFormFieldsAsync(formFields);
    }

    // Validation event handler
    private void OnValidateFormFields(ValidateFormFieldsArgs args)
    {
        Dictionary<string, object> unfilledFields = args.UnfilledFields;
        foreach (var field in unfilledFields)
        {
            Console.WriteLine($"Field Name: {field.Key}, Default Value: {field.Value}");
            // Further processing of unfilled fields
        }
    }
}
