---
title:    Criando um Web Component - Parte 1: Vanilla JavaScript
tagline:  Passo a passo da criação de um Web Component utilizando JavaScript puro
tags:     web-component javascript vanilla-js
date:     2015-11-30T21:08:00+00:00

isDraft:    true
---

Uma das grandes novidades, os Web Components já foram notícia em grandes fontes da nossa área, como o [Tableless][1] e [iMasters][2], mas ultimamente os holofotes não têm mais apontado para eles, os Service Workers e o trend de offline first estão em grande alta no momento — isso é só um reflexo de como é nossa área, evolução constante. Recomendo a leitura dos artigos citados, já que explicar exatamente o que é cada tecnologia não é o foco deste post.

A boa notícia é que essas especificações não foram esquecidas, elas ainda estão sendo discutidas pelas desenvolvedoras dos browsers, e ainda sofrem mudanças grandes, como a [depreciação dos seletores /deep/ e ::shadow](3).

# Vanilla JavaScript
É a [biblioteca][4] mais utilizada, desde sempre. Não é nada mais nada menos do que o JavaScript puro, como nós já o conhecemos, com suas APIs padrão. Já vem com o browser, possui uma [documentação concreta][5]. Não precisamos de mais nada, certo?

# O Que Vamos Construir
Um relógio?

# Primeiros Passos
Vamos criar uma página HTML comum, para testar nosso componente enquanto desenvolvemos. Chamarei a minha de `demo.html`:

Como a especificação está sendo escrita nesse momento, a maioria dos browsers ainda não a implementam. O único que a implementa completamente*, por enquanto, é o Chrome. Por isso, para que nosso exemplo funcione, vamos precisar de um polyfill, o [webcomponents.js][6]

# Links
* [twitter-post](https://github.com/danguilherme/twitter-post/tree/vanilla)


[1]: http://tableless.com.br/web-components-introducao/
[2]: Web Components no iMasters
[3]: /deep/ e ::shadow depreciados
[4]: vanilla.js
[5]: MDN - Documentação JS
[6]: polyfill
