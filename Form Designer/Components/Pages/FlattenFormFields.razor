@page "/flatten-form-fields"
@using Syncfusion.Blazor
@using Syncfusion.Blazor.SfPdfViewer
@using Syncfusion.Blazor.Buttons
@using Syncfusion.Pdf
@using Syncfusion.Pdf.Parsing

<SfButton @onclick="FlattenDownload">Flatten</SfButton>

<SfPdfViewer2 Height="600px"
              Width="100%"
              @ref="Viewer">
</SfPdfViewer2>

@code {
    private SfPdfViewer2? Viewer;
    public string DocumentPath { get; set; } = "wwwroot/data/Form_Filling_Document.pdf";

    private async Task FlattenDownload()
    {
        if (Viewer is null) return;
        
        // Get current document from viewer as byte array
        byte[] bytes = await Viewer.GetDocumentAsync();
        
        // Load into PdfLoadedDocument for flattening
        PdfLoadedDocument loadedDocument = new PdfLoadedDocument(bytes);
        
        // Flatten form fields
        if (loadedDocument.Form != null)
        {
            loadedDocument.Form.Flatten = true;
        }

        // Flatten annotations on all pages
        foreach (PdfLoadedPage page in loadedDocument.Pages)
        {
            page.Annotations.Flatten = true;
        }
        
        // Save flattened PDF to byte array
        byte[] flattenedBytes;
        using (MemoryStream stream = new MemoryStream())
        {
            loadedDocument.Save(stream);
            flattenedBytes = stream.ToArray();
        }
        
        loadedDocument.Close(true);

        // Reload flattened document into viewer
        await Viewer.LoadAsync(flattenedBytes);

        // Download the flattened PDF
        await Viewer.DownloadAsync();
    }
}
