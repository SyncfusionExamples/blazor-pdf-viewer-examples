
window.pdfViewerHelpers = window.pdfViewerHelpers || {};

window.pdfViewerHelpers.preventCrosshairOnTextLayer = function () {
    const layers = document.querySelectorAll('.e-pv-text-layer');

    if (!layers || layers.length === 0) {
        console.warn('No .e-pv-text-layer elements found.');
        return;
    }

    layers.forEach(layer => {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const el = mutation.target;
                    const cursor = getComputedStyle(el).cursor;
                    if (cursor === 'crosshair') {
                        el.style.cursor = 'default';
                    }
                }
            }
        });

        observer.observe(layer, {
            attributes: true,
            subtree: true,
            attributeFilter: ['style']
        });
    });
};
