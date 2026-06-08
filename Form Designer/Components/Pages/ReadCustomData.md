@page "/read-custom-data"
@using Syncfusion.Blazor.SfPdfViewer

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
    <PdfViewerEvents DocumentLoaded="@OnDocumentLoaded"></PdfViewerEvents>
</SfPdfViewer2>

@code {
    private SfPdfViewer2? viewer;
    private string DocumentPath = "wwwroot/data/form-designer.pdf";

    private async Task OnDocumentLoaded()
    {
        if (viewer == null) return;

        // Get all form fields
        var fields = await viewer.GetFormFieldsAsync();

        // Access custom data from each field
        foreach (var field in fields)
        {
            Console.WriteLine($"Field: {field.Name}");
            if (field.CustomData != null)
            {
                Console.WriteLine($"Custom Data: {System.Text.Json.JsonSerializer.Serialize(field.CustomData)}");
            }
        }
    }
}
