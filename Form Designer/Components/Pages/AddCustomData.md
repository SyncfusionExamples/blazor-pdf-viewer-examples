@page "/add-custom-data"
@using Syncfusion.Blazor.SfPdfViewer
@using System.Collections.Generic

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
    <PdfViewerEvents DocumentLoaded="@AddFormFieldsWithCustomData"></PdfViewerEvents>
</SfPdfViewer2>

@code {
    private SfPdfViewer2? viewer;
    private string DocumentPath = "wwwroot/data/form-designer.pdf";

    private async Task AddFormFieldsWithCustomData()
    {
        if (viewer == null) return;

        // Define custom metadata
        var customMetadata = new Dictionary<string, object>
        {
            { "businessId", "C-1024" },
            { "tags", new[] { "profile", "kiosk" } },
            { "requiredRole", "admin" }
        };

        // Create a TextBox field with custom data
        var textField = new TextBoxField
        {
            Name = "Email",
            CustomData = customMetadata,
            Bounds = new Bound { X = 146, Y = 229, Width = 200, Height = 24 }
        };

        // Add the field to the document
        await viewer.AddFormFieldsAsync(new List<FormFieldInfo> { textField });
    }
}
