# [danguilherme.github.io](https://danguilherme.github.io/)

Repositório do meu blog e futuro site.

## Criação de artigos
* Criar o arquivo em `documents\blog\`
* Colocar nome, tagline, tags, date e isDraft
* Criar uma imagem em `files\blog\content\${nomeDoPost}\cover.png`
  * A imagem deve ser wide (landscape, largura maior que altura, etc). Tamanho ideal: 1024x512


## Tecnologias utilizadas
* [DocPad](https://docpad.org/) - gerador de site estático no [Node.js](https://nodejs.org/) (com vários [plugins](https://github.com/danguilherme/danguilherme.github.io/blob/source/package.json#L7-L19)).
* [Stylus](https://learnboost.github.io/stylus/) - pré-processador CSS, também no Node.js.

## Executar

**Pré-requisitos:**
- Node (v4+)

**Passo a passo:**
1. Instalar [GraphicsMagick](http://www.graphicsmagick.org/)
    - Windows: [download and install](http://www.graphicsmagick.org/INSTALL-windows.html) (Q8 version)
    - Ubuntu: `sudo apt-get install graphicsmagick`
    - Mac OS: `brew install graphicsmagick`
1. `npm start`
