@page "/extract-all-form-field-values"
@using Syncfusion.Blazor.SfPdfViewer
@using Syncfusion.Blazor.Buttons

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
</SfPdfViewer2>

<SfButton @onclick="ExtractAllFieldValues">Extract All Values</SfButton>

@code {
    private SfPdfViewer2? viewer;
    private string DocumentPath = "wwwroot/data/Form_Filling_Document_With_Data.pdf";

    private async Task ExtractAllFieldValues()
    {
        if (viewer == null) return;
        List<FormFieldInfo> formFields = await viewer.GetFormFieldsAsync();

        foreach (FormFieldInfo field in formFields)
        {
            if (field is CheckBoxField checkBoxField)
            {
                Console.WriteLine($"{field.Name}: {checkBoxField.IsChecked}");
            }
            else if (field is RadioButtonField radioButtonField)
            {
                Console.WriteLine($"{field.Name}: {radioButtonField.IsSelected}");
            }
            else if (field is TextBoxField textBoxField)
            {
                Console.WriteLine($"{field.Name}: {textBoxField.Value}");
            }
            else if (field is DropDownField dropDownField)
            {
                ListItem? selectedItem = dropDownField.Items.ElementAtOrDefault(dropDownField.SelectedIndex);
                Console.WriteLine($"{field.Name}: {selectedItem?.Value}");
            }
            else
            {
                Console.WriteLine($"{field.Name}: (unknown type)");
            }
        }
    }
}
