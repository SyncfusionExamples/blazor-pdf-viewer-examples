const synth = window.speechSynthesis;

let voices = [];

const voicesReady = new Promise((resolve) => {
    const tryGet = () => {
        const voice = synth.getVoices();
        if (voice && voice.length) {
            voices = voice;
            resolve(voice);
            return true;
        }
        return false;
    };
    if (tryGet()) return;
    const onVoices = () => {
        if (tryGet()) {
            synth.removeEventListener('voiceschanged', onVoices);
        }
    };
    synth.addEventListener('voiceschanged', onVoices);
    // Fallback polling for browsers that don't fire voiceschanged reliably
    let tries = 0;
    const poll = setInterval(() => {
        if (tryGet() || ++tries > 30) {
            clearInterval(poll);
            voices = synth.getVoices() || [];
            synth.removeEventListener('voiceschanged', onVoices);
            resolve(voices);
        }
    }, 100);
});

// iOS/iPadOS Safari requires a user gesture before speech works reliably.
// This one-time unlock speaks a silent utterance on first tap/click/keydown.
let __ttsUnlocked = false;
let __unlockPromise = null;
function ensureTtsUnlocked() {
    if (__ttsUnlocked) return Promise.resolve();
    if (__unlockPromise) return __unlockPromise;
    __unlockPromise = new Promise((resolve) => {
        const cleanup = () => {
            ['click', 'touchstart', 'keydown'].forEach(evt => document.removeEventListener(evt, onEvent, true));
        };
        const onEvent = () => {
            try {
                const u = new SpeechSynthesisUtterance(''); // silent token
                u.volume = 0;
                u.rate = 1;
                u.onend = () => {
                    __ttsUnlocked = true;
                    cleanup();
                    resolve();
                };
                // Queue in a macrotask to avoid race with gesture handling
                setTimeout(() => synth.speak(u), 0);
            } catch (_) {
                __ttsUnlocked = true;
                cleanup();
                resolve();
            }
        };
        ['click', 'touchstart', 'keydown'].forEach(evt => document.addEventListener(evt, onEvent, true));
    });
    return __unlockPromise;
}

function populateVoiceList() {
    voices = synth.getVoices().sort(function (a, b) {
        const aname = a.name.toUpperCase();
        const bname = b.name.toUpperCase();

        if (aname < bname) {
            return -1;
        } else if (aname == bname) {
            return 0;
        } else {
            return +1;
        }
    });
}

async function speakFromControls(input) {
    await voicesReady;

    const t = (typeof input === 'string' ? input.trim() : (input?.value || '').trim());
    if (!t) return;

    // Cancel any current speech to avoid overlaps/refresh quirks
    if (synth.speaking) {
        synth.cancel();
    }

    const utterThis = new SpeechSynthesisUtterance(t);

    utterThis.onend = function () {
        console.log("SpeechSynthesisUtterance.onend");
    };

    utterThis.onerror = function (e) {
        console.error("SpeechSynthesisUtterance.onerror", e);
    };

    const available = speechSynthesis.getVoices();
    let voice = null;
    voice = available.find(v => v.default) || available[0];
    if (voice) {
        utterThis.voice = voice;
        if (voice.lang) utterThis.lang = voice.lang; // Safari iOS respects lang better
    }

    utterThis.pitch = 1;
    utterThis.rate = 1;

    // Safari sometimes needs a microtask delay after cancel before speak
    setTimeout(() => synth.speak(utterThis), 0);
}

async function initUi() {
    await voicesReady;
    // Populate voices now that controls exist
    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }
    return true;
}

// Initialize when DOM is ready; also handle Blazor re-renders
document.addEventListener('DOMContentLoaded', async () => {
    // Set up iOS unlock listeners early
    ensureTtsUnlocked();
    if (await initUi()) return;
    const obs = new MutationObserver(async () => {
        if (await initUi()) obs.disconnect();
    });
    obs.observe(document.body, { childList: true, subtree: true });
});

// Expose a helper to manually unlock from .NET or UI (tap/click)
window.unlockTtsForIOS = () => ensureTtsUnlocked();

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
     speakFromControls(text);
}

// Cancel speech and remove highlights - Mircosoft Reader
 function cancelReading() {
    if (window.speechSynthesis?.speaking) {
        window.speechSynthesis.cancel();
    }
}