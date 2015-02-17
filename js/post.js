;(function() {
  document.addEventListener('readystatechange', function() {
    if (document.readyState == 'complete') onDocumentReady();
  });

  function onDocumentReady() {
    addHeadersPermalinkIcon();
  };

  /* Adds a link icon that points to its header (like '#header-id') */
  function addHeadersPermalinkIcon() {
    var headers = document.querySelector('#post')
      .querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');

    for (var i = 0; i < headers.length; i++) {
      var el = headers[i];
      var anchor = document.createElement('A');
      anchor.href = '#' + el.id;
      anchor.classList.add('header-permalink', 'plain');
      el.appendChild(anchor);
    };
  }
}());
