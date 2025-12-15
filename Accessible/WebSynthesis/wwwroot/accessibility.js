// Register .NET object for interop
 function registerDotNetObject(dotNetObj) {
    window.myDotNetObj = dotNetObj;
}
// Read selected text and highlight
function readSelectedText(args, zoomLevel, muteVoice) {
    const viewerInfo = getViewerInfo();
    window.speechSynthesis.cancel();
    clearAllHighlights();
    const text = args.textContent;
    const bounds = args.textBounds;
    bounds.forEach(bound => {
        const pageDiv = document.getElementById(`${viewerInfo.viewerId}_pageDiv_${bound.pageIndex - 1}`);
        if (pageDiv) createHighlightBox(bound, pageDiv, zoomLevel);
    });
    if (muteVoice) return;
    requestAnimationFrame(() => {
        speakText(text, clearAllHighlights);
    });
}
// Read a line from page and notify .NET
function readLineFromPage(pageIndex, lineIndex, isPrev, muteVoice) {
    window.speechSynthesis.cancel();
    clearAllHighlights();
    const viewerInfo = getViewerInfo();
    if (!viewerInfo) return;
    const pageDiv = document.getElementById(`${viewerInfo.viewerId}_pageDiv_${pageIndex}`);
    if (!pageDiv) return;
    function processLines() {
        const linesArray = getLinesFromPage(pageIndex);
        if (!linesArray || linesArray.length === 0) return;
        let currentLineSpans;
        if (lineIndex >= linesArray.length && linesArray.length > 0) {
            window.myDotNetObj.invokeMethodAsync('GoNextPage');
            return;
        }
        if (lineIndex === -1) {
            window.myDotNetObj.invokeMethodAsync('GoPreviousPage');
            return;
        }
        if (isPrev) {
            currentLineSpans = linesArray[linesArray.length - 1];
        } else {
            currentLineSpans = linesArray[lineIndex];
        }
        addHighlightBox(currentLineSpans);
        if (currentLineSpans && !muteVoice) {
            const lineText = currentLineSpans.map(s => s.textContent).join(' ');
            requestAnimationFrame(() => {
                speakText(lineText, clearAllHighlights);
            });
        }
    }
    // If spans already exist, process immediately
    if (pageDiv.querySelector('.e-pv-text-layer span')) {
        processLines();
    } else {
        // Observe DOM changes until spans are added
        const observer = new MutationObserver(() => {
            if (pageDiv.querySelector('.e-pv-text-layer span')) {
                observer.disconnect();
                processLines();
            }
        });
        observer.observe(pageDiv, { childList: true, subtree: true });
    }
}
// Update the current line index value
 function updateLineIndex(pageIndex) {
    return new Promise(resolve => {
        const viewerInfo = getViewerInfo();
        if (!viewerInfo) return resolve(0);
        const pageDiv = document.getElementById(`${viewerInfo.viewerId}_pageDiv_${pageIndex}`);
        if (!pageDiv) return resolve(0);
        function checkSpanElement() {
            const textLayer = pageDiv.querySelector('.e-pv-text-layer');
            if (textLayer && textLayer.querySelector('span')) {
                const linesArray = getLinesFromPage(pageIndex);
                resolve(linesArray.length);
                return true;
            }
            return false;
        }
        if (!checkSpanElement()) {
            const observer = new MutationObserver(() => {
                if (checkSpanElement()) observer.disconnect();
            });
            observer.observe(pageDiv, { childList: true, subtree: true });
        }
    });
}
// Group spans into lines
function getLinesFromPage(pageIndex) {
    const viewerInfo = getViewerInfo();
    if (!viewerInfo) return [];
    const pageDiv = document.getElementById(`${viewerInfo.viewerId}_pageDiv_${pageIndex}`);
    if (!pageDiv) return [];
    const textLayer = pageDiv.querySelector('.e-pv-text-layer');
    if (!textLayer) return [];
    const spans = Array.from(textLayer.querySelectorAll('span'));
    if (spans.length === 0) return [];
    const rotationStyle = getComputedStyle(spans[0]).transform;
    let rotationAngle = 0;
    if (rotationStyle && rotationStyle !== 'none') {
        const [a, b] = rotationStyle.split('(')[1].split(')')[0].split(',');
        rotationAngle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        if (rotationAngle < 0) rotationAngle += 360;
    }
    const linesMap = new Map();
    spans.forEach(span => {
        const rect = span.getBoundingClientRect();
        const key = (rotationAngle === 90 || rotationAngle === 270) ? Math.round(rect.left) : Math.round(rect.top);
        if (!linesMap.has(key)) linesMap.set(key, []);
        linesMap.get(key).push(span);
    });
    return Array.from(linesMap.values()).map(lineSpans =>
        lineSpans.sort((a, b) => {
            const rectA = a.getBoundingClientRect();
            const rectB = b.getBoundingClientRect();
            return (rotationAngle === 90 || rotationAngle === 270) ? rectA.top - rectB.top : rectA.left - rectB.left;
        })
    );
}

// Speak text with optional target voiceUri; on end, invoke callbacks and reset UI
function speakText(text, onEnd) {
    if (!text || !text.trim()) text = "Warning. No readable text found.";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = onEnd;
    speechSynthesis.speak(utterance);
}
// Create highlight box for given bounds
function createHighlightBox(bound, pageDiv, zoomLevel) {
    const box = document.createElement('div');
    Object.assign(box.style, {
        position: 'absolute',
        left: `${bound.left * zoomLevel}px`,
        top: `${bound.top * zoomLevel}px`,
        width: `${bound.width * zoomLevel}px`,
        height: `${bound.height * zoomLevel}px`,
        border: '2px solid rgba(0, 0, 0, 0.6)',
        borderRadius: '4px',
        pointerEvents: 'none'
    });
    box.className = 'highlight-box-selected';
    // Store original bounds in data attributes
    box.dataset.left = bound.left;
    box.dataset.top = bound.top;
    box.dataset.width = bound.width;
    box.dataset.height = bound.height;
    pageDiv.appendChild(box);
}
// Highlight spans for a line
function addHighlightBox(currentLineSpans) {
    if (!currentLineSpans || currentLineSpans.length === 0) return;
    scrollIntoViewIfNeeded(currentLineSpans[0]);
    const rects = currentLineSpans.map(s => s.getBoundingClientRect());
    const minLeft = Math.min(...rects.map(r => r.left));
    const maxRight = Math.max(...rects.map(r => r.right));
    const minTop = Math.min(...rects.map(r => r.top));
    const maxBottom = Math.max(...rects.map(r => r.bottom));
    const pageDiv = currentLineSpans[0].closest('.e-pv-page-div');
    const pageRect = pageDiv.getBoundingClientRect();
    const highlightBox = document.createElement('div');
    Object.assign(highlightBox.style, {
        position: 'absolute',
        left: `${minLeft - pageRect.left}px`,
        top: `${minTop - pageRect.top}px`,
        width: `${maxRight - minLeft}px`,
        height: `${maxBottom - minTop}px`,
        border: '2px solid rgba(0, 0, 0, 0.6)',
        borderRadius: '4px',
        pointerEvents: 'none'
    });
    highlightBox.className = 'highlight-box';
    pageDiv.appendChild(highlightBox);
}
// Update highlight dynamically while reading
 function updateHighlightBox(pageIndex, lineIndex, zoomLevel) {
    if (!window.speechSynthesis?.speaking) return;
    // Check if line highlight exists
    const lineHighlights = document.querySelectorAll('.highlight-box');
    const selectedHighlights = document.querySelectorAll('.highlight-box-selected');
    if (lineHighlights.length > 0) {
        // Update line highlight without removing
        clearLineHighlight();
        function tryUpdate() {
            const linesArray = getLinesFromPage(pageIndex);
            if (!linesArray || !linesArray[lineIndex]) {
                setTimeout(tryUpdate, 0);
                return;
            }
            addHighlightBox(linesArray[lineIndex]);
        }
        tryUpdate();
    } else if (selectedHighlights.length > 0) {
        // Update selected-text highlights based on zoom
        selectedHighlights.forEach(box => {
            const left = parseFloat(box.dataset.left);
            const top = parseFloat(box.dataset.top);
            const width = parseFloat(box.dataset.width);
            const height = parseFloat(box.dataset.height);
            Object.assign(box.style, {
                left: `${left * zoomLevel}px`,
                top: `${top * zoomLevel}px`,
                width: `${width * zoomLevel}px`,
                height: `${height * zoomLevel}px`
            });
        });
    }
}
// Get viewer container and ID
function getViewerInfo() {
    const container = document.querySelector('.e-pv-viewer-container');
    if (!container) return null;
    return { container, viewerId: container.id.replace('_viewerContainer', '') };
}
// Scroll to the element
function scrollIntoViewIfNeeded(element) {
    if (!element) return;
    const viewerInfo = getViewerInfo();
    if (!viewerInfo) return;
    const container = viewerInfo.container;
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const isVisible = elementRect.top >= containerRect.top && elementRect.bottom <= containerRect.bottom;
    if (!isVisible) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
// For line level highlights
function clearLineHighlight() {
    document.querySelectorAll('.highlight-box').forEach(box => box.remove());
}
// For selected-text highlights
function clearSelectedHighlights() {
    document.querySelectorAll('.highlight-box-selected').forEach(box => box.remove());
}
// For clear all highlights
function clearAllHighlights() {
    clearLineHighlight();
    clearSelectedHighlights();
}

// Pause or resume speech synthesis
 function readAloudMute(isPaused) {
    const speechSynth = window.speechSynthesis;
    isPaused ? speechSynth.resume() : speechSynth.pause();
}
// Cancel speech and remove highlights - Mircosoft Reader
 function cancelReading() {
    if (window.speechSynthesis?.speaking) {
        window.speechSynthesis.cancel();
        clearAllHighlights();
    }
}
