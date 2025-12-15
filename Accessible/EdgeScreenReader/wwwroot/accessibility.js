
// Initialize PDF accessibility features and observe page changes
function initPdfAccessibility() {
    const viewerInfo = getViewerInfo();
    if (!viewerInfo) return;
    viewerInfo.container.querySelectorAll('.e-pv-page-div').forEach(wirePage);
    const mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType !== 1) return;
                if (node.matches && node.matches('.e-pv-page-div')) {
                    wirePage(node);
                } else if (node.querySelectorAll) {
                    node.querySelectorAll('.e-pv-page-div').forEach(wirePage);
                }
            });
        });
    });
    mutationObserver.observe(viewerInfo.container, { childList: true, subtree: true });
}

// Get viewer container and ID
function getViewerInfo() {
    const container = document.querySelector('.e-pv-viewer-container');
    if (!container) return null;
    return { container, viewerId: container.id.replace('_viewerContainer', '') };
}
// Insert hidden SR node for screen reader - Microsoft Reader
function insertSrNode(div) {
    const pageNumber = (div.id.match(/pageDiv_(\d+)/)[1]);
    const srId = `pdf_page_${pageNumber}_sr`;
    let sr = document.getElementById(srId);
    if (!sr) {
        sr = Object.assign(document.createElement('div'), { id: srId, className: 'e-pv-radio-btn', tabIndex: -1 });
        div.appendChild(sr);
    }
    return sr;
}
// Select SR text for screen reader - Mircosoft Reader
function selectSrText(div) {
    const sr = insertSrNode(div);
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(sr);
    selection.removeAllRanges();
    selection.addRange(range);
}
// Move caret to first visible text node - Mircosoft Reader
function collapseCaretToVisibleText(div) {
    const textLayer = div.querySelector('.e-pv-text-layer');
    if (textLayer) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.setStart(textLayer.firstChild, 0);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
// Focus page for accessibility - Mircosoft Reader
function focusPageDiv(div) {
    if (!div) return;
    const textLayer = div.querySelector('.e-pv-text-layer');
    if (!textLayer || !textLayer.textContent.trim()) {
        requestAnimationFrame(() => focusPageDiv(div));
        return;
    }
    const sr = insertSrNode(div);
    sr.textContent = textLayer.textContent;
    selectSrText(div);
    collapseCaretToVisibleText(div);
}
// Wire accessibility handlers to page div - Mircosoft Reader
function wirePage(div) {
    if (!div || div.hasAttribute('data-a11y-init')) return;
    div.addEventListener('mousedown', () => focusPageDiv(div));
    div.addEventListener('click', () => focusPageDiv(div));
    div.setAttribute('data-a11y-init', 'true');
}

// Reader the selected text aloud - Mircosoft Reader
 function readAloudText(text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

// Cancel speech and remove highlights - Mircosoft Reader
 function cancelReading() {
    if (window.speechSynthesis?.speaking) {
        window.speechSynthesis.cancel();
    }
}