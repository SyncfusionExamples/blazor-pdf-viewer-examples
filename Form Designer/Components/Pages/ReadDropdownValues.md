@page "/read-dropdown-values"
@using Syncfusion.Blazor.SfPdfViewer
@using Syncfusion.Blazor.Buttons

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
</SfPdfViewer2>

<SfButton @onclick="ReadDropdownValues">Read Dropdown Value</SfButton>

@code {
    private SfPdfViewer2? viewer;
    private string DocumentPath = "wwwroot/data/form-document.pdf";

    private async Task ReadDropdownValues()
    {
        if (viewer == null) return;

        try
        {
            var formFields = await viewer.GetFormFieldsAsync();
            var dropdownField = formFields?.FirstOrDefault(field => field is DropDownField && field.Name == "state") as DropDownField;

            if (dropdownField != null && dropdownField.Items != null && dropdownField.Items.Count > 0)
            {
                // Read ALL values in dropdown
                Console.WriteLine("=== All Dropdown Values ===");
                for (int i = 0; i < dropdownField.Items.Count; i++)
                {
                    Console.WriteLine($"Index {i}: Name = {dropdownField.Items[i].Name}, Value = {dropdownField.Items[i].Value}");
                }

                // Get selected item using SelectedIndex
                int selectedIndex = dropdownField.SelectedIndex;
                string selectedValue = selectedIndex >= 0 ? dropdownField.Items[selectedIndex].Value : string.Empty;
                Console.WriteLine($"\nCurrently Selected: Index={selectedIndex}, Value={selectedValue}");

                // Update dropdown with new items
                dropdownField.Items = new List<ListItem>
                {
                    new ListItem { Name = "USA", Value = "US" },
                    new ListItem { Name = "Canada", Value = "CA" },
                    new ListItem { Name = "Mexico", Value = "MX" }
                };
                dropdownField.SelectedIndex = 0; // Set default selection

                await viewer.UpdateFormFieldsAsync(new List<FormFieldInfo> { dropdownField });
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
}
