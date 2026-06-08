@page "/import-export-form-field-data"
@using Syncfusion.Blazor.SfPdfViewer
@using Syncfusion.Blazor.Buttons

<SfButton @onclick="ExportFormFieldData">Export Data</SfButton>
<SfButton @onclick="ImportFormFieldData">Import Data</SfButton>

<SfPdfViewer2 @ref="PdfViewerInstance" DocumentPath="wwwroot/data/Form_Filling_Document.pdf"
              Height="650px"
              Width="100%">
</SfPdfViewer2>

@code { 
    // Reference to the SfPdfViewer2 instance
    SfPdfViewer2 PdfViewerInstance { get; set; }

    // Stream to store exported form field data in FDF format
    MemoryStream FDFStream = new MemoryStream();

    // List to store form field information
    List<FormFieldInfo> FormFields = new List<FormFieldInfo>();

    // Exports form field data from the PDF viewer in FDF format
    private async void ExportFormFieldData()
    {
        // Retrieve form field information from the PDF viewer
        FormFields = await PdfViewerInstance.GetFormFieldsAsync(); 
        if (FormFields != null && FormFields.Count > 0)
        {
            // Export form fields as FDF data
            FDFStream = await PdfViewerInstance.ExportFormFieldsAsync(FormFieldDataFormat.Fdf); 
        }
    }

    // Imports form field data from FDF format into the PDF viewer
    private async void ImportFormFieldData()
    {
        if (FDFStream != null)
        {
            // Import FDF data into the viewer
            await PdfViewerInstance.ImportFormFieldsAsync(FDFStream, FormFieldDataFormat.Fdf); 
        }
    }
}
