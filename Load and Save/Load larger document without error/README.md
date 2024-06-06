# Resolve "Maximum Receive Message Size" error in the PDF viewer

This sample shows how to resolve ""Maximum Receive Message size"" error in the Syncfusion Blazor PDF Viewer while loading a larger PDF document. The Syncfusion’s Blazor PDF Viewer component allows to increase the connection buffer size by adding the below service in program.cs file if the size of the PDFViewer is too large.

Documentation: https://blazor.syncfusion.com/documentation/pdfviewer-2/how-to/increase-connection-buffer-size

## Code
builder.Services.AddSignalR(o => { o.MaximumReceiveMessageSize = 102400000; });

## Project pre-requisites
To run this application, you need Visual Studio 2019 or later versions.

## Deploying and running the sample
To debug while running the application, press F5 or select Debug > Start Debugging. To run the sample without debugging, press Ctrl+F5 or selectDebug > Start Without Debugging.