//// index.js

window.placeRedDotAt = function (x, y, color) {
    let dot = document.getElementById('click-dot');
    if (!dot) {
        dot = document.createElement('div');
        dot.id = 'click-dot';
        dot.style.position = 'absolute';
        dot.style.width = '10px';
        dot.style.height = '10px';
        dot.style.backgroundColor = color;
        dot.style.borderRadius = '50%';
        dot.style.zIndex = '9999';
        document.body.appendChild(dot);
    }
    dot.style.backgroundColor = color;
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
};

window.convertPagePointToClientPoint = function (pagePoint) {
    const pagediv = document.getElementsByClassName('e-pv-page-div')[0];
    const rect = pagediv.getBoundingClientRect();
    const clientX = pagePoint.x + rect.left;
    const clientY = pagePoint.y + rect.top;
    window.placeRedDotAt(clientX, clientY, "red");
   
};
