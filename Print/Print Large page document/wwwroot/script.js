// blob conversion
function printPDF(byteArray) {
    
    const blob = new Blob([byteArray], {type: 'application/pdf'});
    // Create object URL
    const blobUrl = URL.createObjectURL(blob);

    // Open new window with the blob URL
    const printWindow = window.open(blobUrl, '_blank');

    if (!printWindow) {
        alert("Failed to open the PDF. Please allow pop-ups for this site.");
        return;
    }

    const tryPrint = () => {
        printWindow.focus();
        printWindow.print();
    };

    // Try printing on load event (works in Chrome and Edge)
    printWindow.addEventListener('load', tryPrint);

    // Fallback for Firefox: try printing after a delay
    setTimeout(tryPrint, 3000);

    // Clean up the object URL after a delay
    setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
    }, 60000); // Clean up after 1 minute
}


//if you want to open print in same window, use this (not works in firefox alone)
// function printPDF(byteArray) {
//     const blob = new Blob([new Uint8Array(byteArray)], {type: 'application/pdf'});
//     const blobUrl = URL.createObjectURL(blob);

//     let iframe = document.createElement('iframe');
//     iframe.style.display = 'none';
//     document.body.appendChild(iframe);
   
//     iframe.src = blobUrl;

//     const tryPrint = () => {
//         try {
//             if (iframe.contentWindow) {
//                 iframe.contentWindow.focus();
//                 iframe.contentWindow.print();
//             } else {
//                 throw new Error("Unable to access iframe content");
//             }
//         } catch (error) {
//             console.error("Error while trying to print:", error);
//             alert("There was an error while trying to print. Please try again.");
//         }
//     };

//     iframe.onload = () => {
//         setTimeout(tryPrint, 1000);
//     };

//     setTimeout(tryPrint, 3000);

//     // Clean up
//     setTimeout(() => {
//         URL.revokeObjectURL(blobUrl);
//         document.body.removeChild(iframe);
//     }, 60000);
// }