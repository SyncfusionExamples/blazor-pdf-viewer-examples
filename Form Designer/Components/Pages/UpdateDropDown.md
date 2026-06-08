@page "/update-dropdown"
@using Syncfusion.Blazor.SfPdfViewer
@using Syncfusion.Blazor.Buttons

<SfButton @onclick="UpdateFormField">Edit DropDown</SfButton>

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
</SfPdfViewer2>

@code {
    private SfPdfViewer2? viewer;
    private string DocumentPath = "wwwroot/data/FormDesigner_Document.pdf";

    private async Task UpdateFormField()
    {
        if (viewer == null) return;
        
        List<FormFieldInfo> formFields = await viewer.GetFormFieldsAsync();
        
        // Find only the specific dropdown by name
        DropDownField? dropDown = formFields?.FirstOrDefault(f => f.Name == "CountryDropdown" && f is DropDownField) as DropDownField;
        if (dropDown != null)
        {
            dropDown.Items = new List<ListItem> {
                new ListItem { Name = "option 1", Value = "Option 1" },
                new ListItem { Name = "option 2", Value = "Option 2" },
                new ListItem { Name = "option 3", Value = "Option 3" }
            };
            dropDown.FontFamily = "Courier";
            dropDown.FontSize = 10;
            dropDown.Color = "black";
            dropDown.BorderColor = "black";
            dropDown.BackgroundColor = "white";
            
            await viewer.UpdateFormFieldsAsync(new List<FormFieldInfo> { dropDown });
        }
    }
}
