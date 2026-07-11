@page "/group-form-fields"
@using Syncfusion.Blazor.SfPdfViewer

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
    <PdfViewerEvents DocumentLoaded="@OnDocumentLoaded"></PdfViewerEvents>
</SfPdfViewer2>

@code {
    private SfPdfViewer2? viewer;
    private string DocumentPath = "wwwroot/data/Form_Designer.pdf";

    private async Task OnDocumentLoaded()
    {
        if (viewer == null) return;

        // Create grouped form fields with the same name
        List<FormFieldInfo> formFields = new List<FormFieldInfo>
        {
            // Textbox group: same name => mirrored value
            new TextBoxField
            {
                Name = "EmployeeId",
                Bounds = new Bound { X = 146, Y = 229, Width = 150, Height = 24 }
            },
            new TextBoxField
            {
                Name = "EmployeeId", // same name groups the two widgets
                Bounds = new Bound { X = 338, Y = 229, Width = 150, Height = 24 }
            },

            // Radio button group: same name => exclusive selection across the group
            new RadioButtonField
            {
                Name = "Gender",
                Bounds = new Bound { X = 148, Y = 289, Width = 18, Height = 18 },
                IsSelected = false
            },
            new RadioButtonField
            {
                Name = "Gender", // grouped with the first
                Bounds = new Bound { X = 292, Y = 289, Width = 18, Height = 18 },
                IsSelected = false
            },

            // CheckBox group: same name => mirrored checked state
            new CheckBoxField
            {
                Name = "Subscribe",
                Bounds = new Bound { X = 56, Y = 664, Width = 20, Height = 20 },
                IsChecked = false
            },
            new CheckBoxField
            {
                Name = "Subscribe", // grouped with the first
                Bounds = new Bound { X = 242, Y = 664, Width = 20, Height = 20 },
                IsChecked = false
            }
        };

        // Add the grouped form fields to the PDF document
        await viewer.AddFormFieldsAsync(formFields);
    }
}
