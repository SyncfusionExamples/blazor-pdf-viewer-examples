var dotnetobject = null;
window.updateDocument = (data, dotNetinstance) => { 
    let post = JSON.stringify({
        'data': data.base64,
        'type': data.type
    })
    dotnetobject = dotNetinstance;
    const url = "https://localhost:44327/pdfviewer/GetImageStream"
    let xhr = new XMLHttpRequest()
    xhr.open('Post', url, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(post);
    xhr.onload = function (args) {
        dotnetobject.invokeMethodAsync('loadPDFdocument', this.responseText) ;
    }
  }; 