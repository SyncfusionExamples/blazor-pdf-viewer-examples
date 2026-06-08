@page "/update-radiobutton"
@using Syncfusion.Blazor.SfPdfViewer
@using Syncfusion.Blazor.Buttons

<SfButton @onclick="OnEditRadio">Edit RadioButton</SfButton>

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
</SfPdfViewer2>

@code {
    private SfPdfViewer2? viewer;
    private string DocumentPath = "wwwroot/data/form-designer.pdf";

    private async Task OnEditRadio()
    {
        if (viewer == null) return;

        List<FormFieldInfo> fields = await viewer.GetFormFieldsAsync();
        
        var genderRadios = fields?.Where(f => f.Name == "Gender").ToList();
        
        if (genderRadios?.Count > 1)
        {
            (genderRadios[0] as RadioButtonField).IsSelected = false;
            (genderRadios[1] as RadioButtonField).IsSelected = true;
            genderRadios[1].Thickness = 2;
            genderRadios[1].BorderColor = "yellow";

            await viewer.UpdateFormFieldsAsync(genderRadios);
        }
    }
}
