@page "/extract-form-data-after-document-loaded"
@using Syncfusion.Blazor.SfPdfViewer

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
    <PdfViewerEvents DocumentLoaded="@OnDocumentLoaded"></PdfViewerEvents>
</SfPdfViewer2>

@code {
    private SfPdfViewer2? viewer;
    private string DocumentPath = "wwwroot/data/form-document.pdf";

    private async Task OnDocumentLoaded()
    {
        if (viewer == null) return;

        // Access form data right after the PDF loads
        var formFields = await viewer.GetFormFieldsAsync();
        var emailField = formFields.FirstOrDefault(field => field is TextBoxField && field.Name == "email") as TextBoxField;
        string email = emailField?.Value ?? string.Empty;
        
        Console.WriteLine($"Email: {email}");
    }
}
