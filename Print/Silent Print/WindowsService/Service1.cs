using Microsoft.Owin.Hosting;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace WindowsService
{
    public partial class Service1 : ServiceBase
    {
        int port = Convert.ToInt16(ConfigurationSettings.AppSettings["Webserver-Port"]);
        int scheduleTime = Convert.ToInt32(ConfigurationSettings.AppSettings["ThreadTime"]);
        public Service1()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            try
            {
                HostWebServer();
            }
            catch (Exception)
            {
                throw;
            }
        }


        protected override void OnStop()
        {
            try
            {

            }
            catch (Exception)
            {
                throw;
            }
        }

        private void HostWebServer()
        {
            try
            {
                // Start OWIN host 
                WebApp.Start<StartUp>(url: "http://localhost:9000/");

                string path = "C:\\sample.txt";
                using (StreamWriter writter = new StreamWriter(path, true))
                {
                    writter.WriteLine(string.Format("Web service started on " + DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt")));
                    writter.Close();
                }

                Console.ReadLine();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
