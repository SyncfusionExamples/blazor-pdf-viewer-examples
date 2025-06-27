window.convertClientPointToPagePoint = function (clientPoint) {
  const pagediv = document.getElementsByClassName('e-pv-page-div')[0];
  const rect = pagediv.getBoundingClientRect();
    return {
        x: clientPoint.x - rect.left,
        y: clientPoint.y - rect.top
    }
};