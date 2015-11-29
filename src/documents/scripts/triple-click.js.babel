/**
* Adds a "tripleclick" event type
* Based on http://stackoverflow.com/a/6480113/1574059
*/
;(function(window, undefined) {
  var div = document.getElementsByTagName("div")[0];

  function onTripleClick(element, handler) {
    if (!element) return;

    var timer,        // timer required to reset
      timeout = 200;  // timer reset in ms

    element.addEventListener("dblclick", function (evt) {
      timer = setTimeout(function () {
        timer = null;
      }, timeout);
    });

    element.addEventListener("click", function (evt) {
      if (timer) {
        clearTimeout(timer);
        timer = null;

        handler && handler.call(element, evt);
      }
    });
  }

  var originalAddEventListener = HTMLElement.prototype.addEventListener;
  HTMLElement.prototype.addEventListener = function (name, handler) {
    if (name === 'tripleclick')
      onTripleClick(this, handler);
    else
      originalAddEventListener.call(this, name, handler);
  };
})(window);
