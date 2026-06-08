@page "/add-password"
@using Syncfusion.Blazor.SfPdfViewer

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
    <PdfViewerEvents DocumentLoaded="@AddPasswordField"></PdfViewerEvents>
</SfPdfViewer2>

@code {
    private SfPdfViewer2 viewer;
    private string DocumentPath = "wwwroot/data/form-filling-document.pdf";

    private async Task AddPasswordField()
    {
        // Create a password field with properties
        PasswordField passwordField = new PasswordField()
        {
            Name = "AccountPassword",
            Bounds = new Bound() { X = 100, Y = 190, Width = 200, Height = 24 },
            IsRequired = true,
            MaxLength = 32,
            TooltipText = "Enter a secure password"
        };

        // Add the password field to the PDF document
        await viewer.AddFormFieldsAsync(new List<FormFieldInfo> { passwordField });
    }
}
