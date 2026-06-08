@page "/update-checkbox"
@using Syncfusion.Blazor.SfPdfViewer
@using Syncfusion.Blazor.Buttons

<SfButton @onclick="OnEditCheckbox">Edit CheckBox</SfButton>

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
</SfPdfViewer2>

@code {
    private SfPdfViewer2? viewer;
    private string DocumentPath = "wwwroot/data/form-designer.pdf";

    private async Task OnEditCheckbox()
    {
        if (viewer == null) return;

        List<FormFieldInfo> fields = await viewer.GetFormFieldsAsync();
        
        var cb = fields?.FirstOrDefault(f => f.Name == "Subscribe");
        
        if (cb != null)
        {
            (cb as CheckBoxField).IsChecked = true;
            cb.BackgroundColor = "white";
            cb.BorderColor = "black";
            cb.Thickness = 2;
            cb.TooltipText = "Subscribe to newsletter";

            await viewer.UpdateFormFieldsAsync(new List<FormFieldInfo> { cb });
        }
    }
}
