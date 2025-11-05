function fileOpen(uploaderClass) {
    const fileUploadButton = document.querySelector(`.${uploaderClass} .e-upload-browse-btn`);
    if (fileUploadButton) {
        fileUploadButton.click();
    }
}

function downloadPdfFile(filename, base64Data) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = 'data:application/pdf;base64,' + base64Data;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}