@page "/update-signature"
@using Syncfusion.Blazor.SfPdfViewer
@using Syncfusion.Blazor.Buttons

<SfButton @onclick="OnEditSignature">Edit Signature</SfButton>

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
</SfPdfViewer2>

@code {
    private SfPdfViewer2? viewer;
    private string DocumentPath = "wwwroot/data/Form_Designer.pdf";

    private async Task OnEditSignature()
    {
        if (viewer == null) return;

        List<FormFieldInfo> fields = await viewer.GetFormFieldsAsync();
        
        FormFieldInfo? sig = fields?.FirstOrDefault(f => f.Name == "Sign");
        
        if (sig != null)
        {
            sig.TooltipText = "Please sign here";
            sig.Thickness = 3;
            sig.IsRequired = true;
            sig.BackgroundColor = "white";
            sig.BorderColor = "black";

            await viewer.UpdateFormFieldsAsync(new List<FormFieldInfo> { sig });
        }
    }
}
