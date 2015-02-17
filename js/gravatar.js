;(function() {
  function loadGravatar(email, imgEl) {
    if (!email) return '';
    if (!('CryptoJS' in window)) {
      loadScript('/js/CryptoJS v3.1.2/rollups/md5.js', function() {
        loadGravatar(email, imgEl);
      });

      return;
    }

    imgEl.src = 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(email.toLowerCase()) + '.png?s=200&d=retro';
  }

  function loadScript(url,callback) {
    var element = document.createElement("script");
    element.async = true;
    element.src = url;
    document.body.appendChild(element);
    element.onload = callback;
    return element;
  }

  window.loadGravatar = loadGravatar;
}());
