@page "/add-dropdown"
@using Syncfusion.Blazor.SfPdfViewer

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
    <PdfViewerEvents DocumentLoaded="@AddDropDownField"></PdfViewerEvents>
</SfPdfViewer2>

@code {
    private SfPdfViewer2 viewer;
    private string DocumentPath = "wwwroot/data/Form_Filling_Document.pdf";

    private async Task AddDropDownField()
    {
        // Create list items for the dropdown
        List<ListItem> options = new List<ListItem>()
        {
            new ListItem() { Name = "Item 1", Value = "item1" },
            new ListItem() { Name = "Item 2", Value = "item2" },
            new ListItem() { Name = "Item 3", Value = "item3" }
        };

        // Create a dropdown field with items
        DropDownField dropDownField = new DropDownField()
        {
            Name = "Country",
            Bounds = new Bound() { X = 560, Y = 320, Width = 150, Height = 24 },
            Items = options
        };

        // Add the dropdown field to the PDF document
        await viewer.AddFormFieldsAsync(new List<FormFieldInfo> { dropDownField });
    }
}
