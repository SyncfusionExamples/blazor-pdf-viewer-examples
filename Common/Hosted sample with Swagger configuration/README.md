# Create a hosted sample with Swagger Configuration in the PDF viewer
This example shows how to create a hosted sample with Swagger Configuration.

Documentation: https://blazor.syncfusion.com/documentation/pdfviewer/getting-started/features

## Project pre-requisites
To run this application, you need Visual Studio 2022 or later versions.

If you create a new Blazor project with Visual Studio 2022 and .NET 6, you can have the option to host the webassembly part into an ASP.NET Core application.  

### How to add Swagger:
* Create a Blazor WebAssembly project in VisualStudio 2022.
* During the wizard, remember to check ""ASP.NET Core hosted"". By default is unchecked.
* Add the NuGet package called ""Swashbuckle.AspNetCore"" and confirm all the messages.
* Open the file called ""Program.cs"" and add the code below after the line 9:
builder.Services.AddSwaggerGen();
* And the code below after the line 32:
  app.UseSwagger();
  app.UseSwaggerUI(c =>
  {
      c.SwaggerEndpoint(""/swagger/v1/swagger.json"", ""Blazor API V1"");
  });
* Now you can launch the project and see the result.
Try to add the url segment ""/swagger"" in the address and you should see an swagger image in the address bar.

## Deploying and running the sample
To debug while running the application, press F5 or select Debug > Start Debugging. To run the sample without debugging, press Ctrl+F5 or selectDebug > Start Without Debugging.