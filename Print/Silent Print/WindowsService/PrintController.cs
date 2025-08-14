using Syncfusion.Windows.Forms.PdfViewer;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Windows.Forms;

namespace WindowsService
{
    public class PrintController : ApiController
    {
        public IHttpActionResult Get()
        {
            return Ok("I am alive");
        }


        [HttpPost]
        public IHttpActionResult Print()
        {
            try
            {
                string document = string.Empty;

                var stream =Request.Content.ReadAsStreamAsync().Result;

                PdfViewerControl pdfViewerControl = new PdfViewerControl();
                // Load the PDF document to be printed.
                pdfViewerControl.Load(stream);

                string printerName = "Hewlett-Packard HP LaserJet Pro MFP M128fn";

                // Print the PDF document silently using the printer name.
                pdfViewerControl.Print(printerName);


                return Ok("Print completed");
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }   
    }    
}
