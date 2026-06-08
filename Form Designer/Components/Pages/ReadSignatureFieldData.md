@page "/read-signature-field-data"
@using Syncfusion.Blazor.SfPdfViewer
@using Syncfusion.Blazor.Buttons

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
</SfPdfViewer2>

<SfButton @onclick="ReadSignatureData">Read Signature Data</SfButton>

@code {
    private SfPdfViewer2? viewer;
    private string DocumentPath = "wwwroot/data/form-document.pdf";

    private async Task ReadSignatureData()
    {
        if (viewer == null) return;
        var formFields = await viewer.GetFormFieldsAsync();
        var signatureField = formFields.FirstOrDefault(field => field is SignatureField && field.Name == "signature") as SignatureField;
        string signatureData = signatureField?.Value ?? string.Empty;
        Console.WriteLine($"Signature data: {signatureData}");
    }
}
