@page "/update-listbox"
@using Syncfusion.Blazor.SfPdfViewer
@using Syncfusion.Blazor.Buttons

<SfButton @onclick="UpdateFormField">Edit ListBox</SfButton>

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
</SfPdfViewer2>

@code {
    private SfPdfViewer2? viewer;
    private string DocumentPath = "wwwroot/data/formDesigner_Document.pdf";

    private async Task UpdateFormField()
    {
        if (viewer == null) return;
        
        List<FormFieldInfo> formFields = await viewer.GetFormFieldsAsync();
        
        // Find and update ListBoxField
        var listBox = formFields?.FirstOrDefault(f => f.Name == "InterestListBox" && f is ListBoxField) as ListBoxField;
        if (listBox != null)
        {
            listBox.Items = new List<ListItem> {
                new ListItem { Name = "item 1", Value = "Item 1" },
                new ListItem { Name = "item 2", Value = "Item 2" },
                new ListItem { Name = "item 3", Value = "Item 3" }
            };
            listBox.FontFamily = "Courier";
            listBox.FontSize = 10;
            listBox.Color = "black";
            listBox.BorderColor = "black";
            listBox.BackgroundColor = "white";
            
            await viewer.UpdateFormFieldsAsync(new List<FormFieldInfo> { listBox });
        }
    }
}
