using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.AspNetCore.Hosting;
using Syncfusion.Blazor.PdfViewer;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json;

namespace Swagger_configuration.Server.Controllers
{   
    [Route("[controller]")]
    public class PdfViewerController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private IMemoryCache _cache;

        public PdfViewerController(IMemoryCache memoryCache, IWebHostEnvironment hostingEnvironment)
        {
            _cache = memoryCache;
            _hostingEnvironment = hostingEnvironment;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [AcceptVerbs("Post")]
        [HttpPost]
        [Route("Load")]
        public IActionResult Load([FromBody] Dictionary<string, object> args)
        {
            Dictionary<string, string> jsonObject = args.ToDictionary(k => k.Key, k => k.Value?.ToString());
            PdfRenderer pdfviewer = new PdfRenderer(_cache);
            MemoryStream stream = new MemoryStream();
            object jsonResult = new object();
            if (jsonObject != null && jsonObject.ContainsKey("document"))
            {
                if (bool.Parse(jsonObject["isFileName"]))
                {
                    string documentPath = GetDocumentPath(jsonObject["document"]);
                    if (!string.IsNullOrEmpty(documentPath))
                    {
                        byte[] bytes = System.IO.File.ReadAllBytes(documentPath);
                        stream = new MemoryStream(bytes);
                    }
                    else
                    {
                        return this.Content(jsonObject["document"] + " is not found");
                    }
                }
                else
                {
                    byte[] bytes = Convert.FromBase64String(jsonObject["document"]);
                    stream = new MemoryStream(bytes);
                }
            }
            jsonResult = pdfviewer.Load(stream, jsonObject);
            return Content(JsonConvert.SerializeObject(jsonResult));
        }

        [AcceptVerbs("Post")]
        [HttpPost]
        [Route("Bookmarks")]
        public IActionResult Bookmarks([FromBody] Dictionary<string, string> args)
        {
            Dictionary<string, string> jsonObject = args.ToDictionary(k => k.Key, k => k.Value?.ToString());
            PdfRenderer pdfviewer = new PdfRenderer(_cache);
            object jsonResult = pdfviewer.GetBookmarks(jsonObject);
            return Content(JsonConvert.SerializeObject(jsonResult));
        }

        [HttpPost]
        [Route("RenderPdfPages")]
        public IActionResult RenderPdfPages([FromBody] Dictionary<string, string> args)
        {
            Dictionary<string, string> jsonObject = args.ToDictionary(k => k.Key, k => k.Value?.ToString());
            PdfRenderer pdfviewer = new PdfRenderer(_cache);
            object jsonResult = pdfviewer.GetPage(jsonObject);
            return Content(JsonConvert.SerializeObject(jsonResult));
        }

        [AcceptVerbs("Post")]
        [HttpPost]
        [Route("RenderAnnotationComments")]
        public IActionResult RenderAnnotationComments([FromBody] Dictionary<string, string> args)
        {
            Dictionary<string, string> jsonObject = args.ToDictionary(k => k.Key, k => k.Value?.ToString());
            PdfRenderer pdfviewer = new PdfRenderer(_cache);
            object jsonResult = pdfviewer.GetAnnotationComments(jsonObject);
            return Content(JsonConvert.SerializeObject(jsonResult));
        }

        [AcceptVerbs("Post")]
        [HttpPost]        
        [Route("Unload")]
        public IActionResult Unload([FromBody] Dictionary<string, string> args)
        {
            Dictionary<string, string> jsonObject = args.ToDictionary(k => k.Key, k => k.Value?.ToString());
            PdfRenderer pdfviewer = new PdfRenderer(_cache);
            pdfviewer.ClearCache(jsonObject);
            return this.Content("Document cache is cleared");
        }

        [AcceptVerbs("Post")]
        [HttpPost]
        [Route("RenderThumbnailImages")]
        public IActionResult RenderThumbnailImages([FromBody] Dictionary<string, string> args)
        {
            Dictionary<string, string> jsonObject = args.ToDictionary(k => k.Key, k => k.Value?.ToString());
            PdfRenderer pdfviewer = new PdfRenderer(_cache);
            object result = pdfviewer.GetThumbnailImages(jsonObject);
            return Content(JsonConvert.SerializeObject(result));
        }

        [HttpPost]        
        [Route("Download")]
        public IActionResult Download([FromBody] Dictionary<string, string> args)
        {
            Dictionary<string, string> jsonObject = args.ToDictionary(k => k.Key, k => k.Value?.ToString());
            PdfRenderer pdfviewer = new PdfRenderer(_cache);
            string documentBase = pdfviewer.GetDocumentAsBase64(jsonObject);
            return Content(documentBase);
        }

        [AcceptVerbs("Post")]
        [HttpPost]
        [Route("PrintImages")]
        public IActionResult PrintImages([FromBody] Dictionary<string, string> args)
        {
            Dictionary<string, string> jsonObject = args.ToDictionary(k => k.Key, k => k.Value?.ToString());
            PdfRenderer pdfviewer = new PdfRenderer(_cache);
            object pageImage = pdfviewer.GetPrintImage(jsonObject);
            return Content(JsonConvert.SerializeObject(pageImage));
        }

        [AcceptVerbs("Post")]
        [HttpPost]        
        [Route("ExportAnnotations")]
        public IActionResult ExportAnnotations([FromBody] Dictionary<string, string> args)
        {
            Dictionary<string, string> jsonObject = args.ToDictionary(k => k.Key, k => k.Value?.ToString());
            PdfRenderer pdfviewer = new PdfRenderer(_cache);
            string result = pdfviewer.ExportAnnotation(jsonObject);
            return Content(result);

        }

        [AcceptVerbs("Post")]
        [HttpPost]
        [Route("ImportAnnotations")]
        public IActionResult ImportAnnotations([FromBody] Dictionary<string, string> args)
        {
            Dictionary<string, string> jsonObject = args.ToDictionary(k => k.Key, k => k.Value?.ToString());
            PdfRenderer pdfviewer = new PdfRenderer(_cache);
            string jsonResult = string.Empty;
            object JsonResult;
            if (jsonObject != null && jsonObject.ContainsKey("fileName"))
            {
                string documentPath = GetDocumentPath(jsonObject["fileName"]);
                if (!string.IsNullOrEmpty(documentPath))
                {
                    jsonResult = System.IO.File.ReadAllText(documentPath);
                }
                else
                {
                    return this.Content(jsonObject["document"] + " is not found");
                }
            }
            else
            {
                string extension = Path.GetExtension(jsonObject["importedData"]);
                if (extension != ".xfdf")
                {
                    JsonResult = pdfviewer.ImportAnnotation(jsonObject);
                    return Content(JsonConvert.SerializeObject(JsonResult));
                }
                else
                {
                    string documentPath = GetDocumentPath(jsonObject["importedData"]);
                    if (!string.IsNullOrEmpty(documentPath))
                    {
                        byte[] bytes = System.IO.File.ReadAllBytes(documentPath);
                        jsonObject["importedData"] = Convert.ToBase64String(bytes);
                        JsonResult = pdfviewer.ImportAnnotation(jsonObject);
                        return Content(JsonConvert.SerializeObject(JsonResult));
                    }
                    else
                    {
                        return this.Content(jsonObject["document"] + " is not found");
                    }
                }
            }

            return Content(jsonResult);
        }

        [AcceptVerbs("Post")]
        [HttpPost]
        [Route("RenderPdfTexts")]
        public IActionResult RenderPdfTexts([FromBody] Dictionary<string, string> args)
        {
            Dictionary<string, string> jsonObject = args.ToDictionary(k => k.Key, k => k.Value?.ToString());
            PdfRenderer pdfviewer = new PdfRenderer(_cache);
            object result = pdfviewer.GetDocumentText(jsonObject);
            return Content(JsonConvert.SerializeObject(result));
        }

        [AcceptVerbs("Post")]
        [HttpPost]
        [Route("ExportFormFields")]
        public IActionResult ExportFormFields([FromBody] Dictionary<string, string> args)
        {
            Dictionary<string, string> jsonObject = args.ToDictionary(k => k.Key, k => k.Value?.ToString());
            PdfRenderer pdfviewer = new PdfRenderer(_cache);
            string jsonResult = pdfviewer.ExportFormFields(jsonObject);
            return Content(jsonResult);
        }

        [AcceptVerbs("Post")]
        [HttpPost]
        [Route("ImportFormFields")]
        public IActionResult ImportFormFields([FromBody] Dictionary<string, string> args)
        {
            Dictionary<string, string> jsonObject = args.ToDictionary(k => k.Key, k => k.Value?.ToString());
            PdfRenderer pdfviewer = new PdfRenderer(_cache);
            object jsonResult = pdfviewer.ImportFormFields(jsonObject);
            return Content(JsonConvert.SerializeObject(jsonResult));
        }
        private string GetDocumentPath(string document)
        {
            string documentPath = string.Empty;
            if (!System.IO.File.Exists(document))
            {
                var path = _hostingEnvironment.ContentRootPath;
                if (System.IO.File.Exists(path + "\\App_Data\\" + document))
                    documentPath = path + "\\App_Data\\" + document;
            }
            else
            {
                documentPath = document;
            }
            return documentPath;
        }
    }
}