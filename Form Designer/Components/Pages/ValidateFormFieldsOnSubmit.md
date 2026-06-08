@page "/validate-form-fields-on-submit"
@using Syncfusion.Blazor.SfPdfViewer
@using Syncfusion.Blazor.Buttons

<SfPdfViewer2 @ref="Viewer"
              DocumentPath="wwwroot/data/Form_Filling_Document.pdf"
              Height="650px"
              Width="100%"
              EnableFormFieldsValidation="true">
    <PdfViewerEvents DocumentLoaded="@AddFormFields" ValidateFormFields="@OnValidateFormFields"></PdfViewerEvents>  
</SfPdfViewer2>

@code { 
    SfPdfViewer2 Viewer;
    
    // Method triggered when the document is loaded
    private async Task AddFormFields()
    {
        // Define various form fields with their properties and positions
        List<FormFieldInfo> formFields = new List<FormFieldInfo>
        {
            new TextBoxField { Name = "TextBox Field", Bounds = new Bound { X = 278, Y = 247, Width = 200, Height = 24 }, IsRequired = true },
            new PasswordField { Name = "Password Field", Bounds = new Bound { X = 278, Y = 323, Width = 200, Height = 24 }, IsRequired = true },
            new SignatureField { Name = "Signature Field", Bounds = new Bound { X = 278, Y = 686, Width = 200, Height = 63 }, IsRequired = true }
        };
        
        // Add form fields asynchronously to the PDF Viewer
        await Viewer.AddFormFieldsAsync(formFields);
    }

    // Validation event handler
    private void OnValidateFormFields(ValidateFormFieldsArgs args)
    {
        Dictionary<string, object> unfilledFields = args.UnfilledFields;
        foreach (KeyValuePair<string, object> field in unfilledFields)
        {
            Console.WriteLine($"Field Name: {field.Key}, Default Value: {field.Value}");
            // Further processing of unfilled fields
        }
    }
}
