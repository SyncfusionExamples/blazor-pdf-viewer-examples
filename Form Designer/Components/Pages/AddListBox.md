@page "/add-listbox"
@using Syncfusion.Blazor.SfPdfViewer

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
    <PdfViewerEvents DocumentLoaded="@AddListBoxField"></PdfViewerEvents>
</SfPdfViewer2>

@code {
    private SfPdfViewer2 viewer;
    private string DocumentPath = "wwwroot/data/Form_Filling_Document.pdf";

    private async Task AddListBoxField()
    {
        // Create list items for the list box
        List<ListItem> items = new List<ListItem>()
        {
            new ListItem() { Name = "Item 1", Value = "item1" },
            new ListItem() { Name = "Item 2", Value = "item2" },
            new ListItem() { Name = "Item 3", Value = "item3" }
        };

        // Create a list box field with items
        ListBoxField listBoxField = new ListBoxField()
        {
            Name = "States",
            Bounds = new Bound() { X = 100, Y = 310, Width = 220, Height = 70 },
            Items = items
        };

        // Add the list box field to the PDF document
        await viewer.AddFormFieldsAsync(new List<FormFieldInfo> { listBoxField });
    }
}
