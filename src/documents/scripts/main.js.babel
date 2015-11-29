;(function() {
  document.addEventListener('readystatechange', function() {
    if (document.readyState == 'complete') onDocumentReady();
  });

  function onDocumentReady() {
    prepareCodeSelect();
  };

  function prepareCodeSelect() {
    var codes = document.querySelectorAll('code.hljs');

    for (var i = 0; i < codes.length; i++) {
      var code = codes[i];
      code.addEventListener('tripleclick', function(ev) {
        selectCode(ev.currentTarget);

        // do not bubble 'click' to document
        ev.stopPropagation();
      });

      code.setAttribute('title', "Clique três vezes para selecionar tudo");
    }
  }

  function selectCode(codeEl) {
    var codeTextContainer = document.createElement('div');
    codeTextContainer.classList.add('code-text');

    var codeText = document.createElement('textarea');
    codeText.textContent = codeEl.textContent.trim();
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
}());
