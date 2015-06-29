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
      code.addEventListener('dblclick', function(ev) {
        selectCode(ev.currentTarget);
      });

      code.setAttribute('title', "Clique duas vezes para selecionar tudo");
    }
  }

  function selectCode(codeEl) {
    var codeTextContainer = document.createElement('div');
    codeTextContainer.classList.add('code-text');

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
}());
