function initDocumentSize() {
    var b = document.documentElement.clientWidth;
    b = b > 750 ? 750 : b;
    var c = b / 750 * 100;
    document.getElementsByTagName("html")[0].style.fontSize = c + "px"
  }
initDocumentSize();
window.onresize = initDocumentSize;