@page "/fill-form-fields-programmatically"
@using Syncfusion.Blazor.SfPdfViewer

<SfPdfViewer2 @ref="pdfViewer"
              DocumentPath="wwwroot/data/Form_Filling_Document.pdf"
              Height="600px">
</SfPdfViewer2>

<button @onclick="UpdateFormFields">Update Form Fields</button>

@code {
    SfPdfViewer2? pdfViewer;

    async Task UpdateFormFields()
    {
        if (pdfViewer == null)
            return;

        // Get fields
        List<FormFieldInfo> formFields = await pdfViewer.GetFormFieldsAsync();

        if (formFields == null || formFields.Count == 0)
            return;

        // Find textbox safely
        TextBoxField? textField = formFields
            .OfType<TextBoxField>()
            .FirstOrDefault(f => f.Name == "name") 
            ?? formFields.OfType<TextBoxField>().FirstOrDefault();

        if (textField != null)
        {
            textField.Value = "John Doe";
            textField.TooltipText = "First Name";

            // Update using SAME TYPE (FormFieldInfo)
            await pdfViewer.UpdateFormFieldsAsync(new List<FormFieldInfo>()
            {
                textField
            });
        }
    }
}
