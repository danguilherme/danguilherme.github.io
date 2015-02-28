;(function() {
  document.addEventListener('readystatechange', function() {
    if (document.readyState == 'complete') onDocumentReady();
  });

  function onDocumentReady() {
    addHeadersPermalinkIcon();
    prepareCodeSelect();
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

  function prepareCodeSelect() {
    var codes = document.querySelectorAll('code[data-lang]');

    for (var i = 0; i < codes.length; i++) {
      var code = codes[i];
      code.addEventListener('dblclick', function(ev) {
        selectCode(ev.currentTarget);
      });
      code.setAttribute('title', "Clique duas vezes para selecionar tudo");
    }
  }

  function selectCode(codeEl) {
    var codeTextContainer = document.createElement('div');
    codeTextContainer.classList.add('code-text');
    codeTextContainer.setAttribute('data-lang', codeEl.getAttribute('data-lang'));

    var codeText = document.createElement('textarea');
    codeText.textContent = codeEl.textContent;
    codeText.style.height = codeEl.offsetHeight + 'px';

    codeEl.classList.add('copying-code');

    codeTextContainer.appendChild(codeText);
    codeEl.parentNode.insertBefore(codeTextContainer, codeEl);
    codeText.select();

    var removeTextArea = function() {
      codeEl.classList.remove('copying-code');
      codeTextContainer.remove();
      document.removeEventListener('click', removeTextArea);
    };

    document.addEventListener('click', removeTextArea);
  }

  window.selectCode = selectCode;
}());
