@page "/update-custom-data"
@using Syncfusion.Blazor.SfPdfViewer
@using Syncfusion.Blazor.Buttons
@using System.Collections.Generic

<SfButton @onclick="UpdateFirstFieldCustomData">Update First Field Custom Data</SfButton>

<SfPdfViewer2 @ref="@viewer" Height="100%" Width="100%" DocumentPath="@DocumentPath">
</SfPdfViewer2>

@code {
    private SfPdfViewer2? viewer;
    private string DocumentPath = "wwwroot/data/Form_Designer.pdf";

    private async Task UpdateFirstFieldCustomData()
    {
        if (viewer == null) return;

        // Get all form fields
        List<FormFieldInfo> fields = await viewer.GetFormFieldsAsync();
        if (fields.Count == 0) return;

        // Get the first field
        FormFieldInfo targetField = fields[0];

        // Update custom data
        Dictionary<string, object> updatedCustomData = new Dictionary<string, object>
        {
            { "group", "profile" },
            { "flags", new[] { "pii", "masked" } },
            { "updatedAt", DateTime.Now.Ticks }
        };

        targetField.CustomData = updatedCustomData;

        // Update the field
        await viewer.UpdateFormFieldsAsync(new List<FormFieldInfo> { targetField });
    }
}
