@page "/add-radiobutton"
@using Syncfusion.Blazor.SfPdfViewer

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
    <PdfViewerEvents DocumentLoaded="@AddRadioButtonFields"></PdfViewerEvents>
</SfPdfViewer2>

@code {
    private SfPdfViewer2 viewer;
    private string DocumentPath = "wwwroot/data/form-filling-document.pdf";

    private async Task AddRadioButtonFields()
    {
        // Create radio button fields grouped by name 'Gender'
        RadioButtonField maleRadioButton = new RadioButtonField()
        {
            Name = "Gender",
            Value = "Male",
            Bounds = new Bound() { X = 100, Y = 270, Width = 16, Height = 16 }
        };

        RadioButtonField femaleRadioButton = new RadioButtonField()
        {
            Name = "Gender",
            Value = "Female",
            Bounds = new Bound() { X = 160, Y = 270, Width = 16, Height = 16 }
        };

        // Add the radio button fields to the PDF document
        await viewer.AddFormFieldsAsync(new List<FormFieldInfo> { maleRadioButton, femaleRadioButton });
    }
}
