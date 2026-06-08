@page "/get-all-form-fields"
@using Syncfusion.Blazor.SfPdfViewer
@using Syncfusion.Blazor.Buttons

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
</SfPdfViewer2>

<SfButton @onclick="GetAllFormFields">Get Form Fields</SfButton>

@code {
    private SfPdfViewer2? viewer;
    private string DocumentPath = "wwwroot/data/form-document.pdf";

    private async Task GetAllFormFields()
    {
        if (viewer == null) return;
        var formFields = await viewer.GetFormFieldsAsync();
        Console.WriteLine($"Total form fields: {formFields.Count}");
    }
}
