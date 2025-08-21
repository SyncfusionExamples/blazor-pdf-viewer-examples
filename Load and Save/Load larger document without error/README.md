# Resolve "Maximum Receive Message Size" error in the SfPdfViewer
This sample shows how to resolve ""Maximum Receive Message size"" error in the Syncfusion&reg; Blazor SfPdfViewer while loading a larger PDF document. The Syncfusion’s Blazor SfPdfViewer component allows to increase the connection buffer size by adding the below service in program.cs file if the size of the SfPdfViewer is too large.

Documentation: https://help.syncfusion.com/document-processing/pdf/pdf-viewer2/blazor/annotation/comments#comment-panel

## Code
builder.Services.AddServerSideBlazor().AddHubOptions(o => { o.MaximumReceiveMessageSize = 102400000; });

## Project pre-requisites
To run this application, you need Visual Studio 2019 or later versions.

## Deploying and running the sample
To debug while running the application, press F5 or select Debug > Start Debugging. To run the sample without debugging, press Ctrl+F5 or selectDebug > Start Without Debugging.