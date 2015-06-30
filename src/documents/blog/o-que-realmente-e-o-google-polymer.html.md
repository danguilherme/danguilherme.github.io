---
title:    Afinal, o que é o Polymer?
tagline:  Respondendo de uma vez por todas o que realmente é a biblioteca da Google (e principalmente: o que ela não é)
tags:     web-components polymer google custom-elements
date:		2015-06-30T18:04:00
---

É muito comum nos depararmos com essa pergunta, seja em fóruns, grupos do Facebook e até eventos da área. Infelizmente, também é muito comum obtermos respostas vagas ou até mesmo equivocadas sobre ela. E quando essas respostas vão se espalhando como em um telefone sem fio o desentendimento fica ainda maior.

Esse artigo vai te dar a resposta exata do que o [Polymer](https://www.polymer-project.org/) é e, principalmente, **do que ele não é**.

# 1. Ele não é um Polyfill Para a Tecnologia dos Web Components
*Web Components: O futuro da web*. Você já deve ter visto isso em muitos lugares, e com certeza o Polymer ou foi citado ou foi o assunto principal, e por isso muitas pessoas confundem.

Polymer é uma biblioteca que **facilita** a criação de Web Components, que são elementos HTML customizados, independentes e reutilizáveis.

O problema é que a especificação dessa tecnologia, que agrega Custom Elements, HTML Templates, Shadow DOM e HTML Imports, além de ser recente, ainda está em rascunho, não foi finalizada. Os browsers mais recentes (lê-se Google Chrome e Mozilla Firefox) suportam essa tecnologia experimentalmente sob uma flag, mas nossos usuários não terão (e nem devem ter) essas flags ativadas. E é aí que entra o verdadeiro polyfill: [`webcomponents.js`](https://github.com/WebComponents/webcomponentsjs).

Esse é o cara responsável por trazer as funcionalidades descritas nas especificações para os browsers atuais. **`webcomponents.js` é o polyfill.** Se você quiser criar componentes "na unha", vai precisar dele pra usar as tecnologias enquanto elas não estiverem 100% disponíveis. O Polymer também precisa que ele esteja carregado para funcionar nos browsers atualmente (na verdade é uma versão menor dele, `webcomponents-lite.js`).

O Polymer tem foco em deixar a criação desses componentes customizados mais declarativa, *a la* HTML (afinal, é assim que fazemos com todos os outros elementos, né?), priorizando a expressividade com o [açúcar sintático](https://pt.wikipedia.org/wiki/A%C3%A7%C3%BAcar_sint%C3%A1tico) que ele provê.

## Sem <del>Jequiti</del> Polymer
``` html
<!-- Defines element markup -->
<template>
    <p>Hello <strong></strong> :)</p>
</template>

<script>
(function(window, document, undefined) {
    // Refers to the "importer", which is index.html
    var thatDoc = document;

    // Refers to the "importee", which is src/hello-world.html
    var thisDoc =  (thatDoc._currentScript || thatDoc.currentScript).ownerDocument;

    // Gets content from <template>
    var template = thisDoc.querySelector('template').content;

    // Creates an object based in the HTML Element prototype
    var MyElementProto = Object.create(HTMLElement.prototype);

    // Creates the "who" attribute and sets a default value
    MyElementProto.who = 'World';

    // Fires when an instance of the element is created
    MyElementProto.createdCallback = function() {
        // Creates the shadow root
        var shadowRoot = this.createShadowRoot();

        // Adds a template clone into shadow root
        var clone = thatDoc.importNode(template, true);
        shadowRoot.appendChild(clone);

        // Caches <strong> DOM query
        this.strong = shadowRoot.querySelector('strong');

        // Checks if the "who" attribute has been overwritten
        if (this.hasAttribute('who')) {
            var who = this.getAttribute('who');
            this.setWho(who);
        }
        else {
            this.setWho(this.who);
        }
    };

    // Fires when an attribute was added, removed, or updated
    MyElementProto.attributeChangedCallback = function(attr, oldVal, newVal) {
        if (attr === 'who') {
            this.setWho(newVal);
        }
    };

    // Sets new value to "who" attribute
    MyElementProto.setWho = function(val) {
        this.who = val;

        // Sets "who" value into <strong>
        this.strong.textContent = this.who;
    };

    // Registers <hello-world> in the main document
    window.MyElement = thatDoc.registerElement('hello-world', {
        prototype: MyElementProto
    });
})(window, document);
</script>
```
[Elemento simples criado com Vanilla JS.](https://github.com/webcomponents/hello-world-element/blob/master/hello-world.html)

## Com Polymer
``` html
<!-- Imports polymer -->
<link rel="import" href="../polymer/polymer.html">

<!-- Defines element markup -->
<dom-module id="hello-world">
    <template>
        <p>Hello <strong>{{who}}</strong> :)</p>
    </template>
</dom-module>

<!-- Registers custom element -->
<script>
Polymer({
    is: 'hello-world',
    properties: {
        who: {
            type: String,
            value: 'World'
        }
    }
});
</script>
```
[Mesmo elemento criado com Polymer.](https://github.com/webcomponents/hello-world-polymer/blob/master/hello-world.html)

De 65 para 22 linhas. Sem contar o two-way data-binding e a facilidade de leitura do código mais declarativo.

Existem outras bibliotecas que também têm como objetivo facilitar a criação de componentes, como [X-Tags](http://x-tags.org/), da Mozilla, e [Bosonic](http://bosonic.github.io/).

# 2. Ele é uma Biblioteca, não um Framework
A discussão "[Biblioteca vs Framework](http://stackoverflow.com/q/148747/1574059)"  é velha e confusa, por isso antes vou defini-las sob meu ponto de vista.

## Diferença Entre Biblioteca e Framework
TL;DR:  
- **Biblioteca**: você chama
- **Framework**: você é chamado

Falando no contexto de código, bibliotecas contém funções (métodos, objetos, etc) para soluções de problemas específicos, e que podem ser chamadas como é quando precisarmos. Alguns exemplos são bibliotecas para manipulação de imagens, criação de PDFs ou para fazer requisições HTTP. Já os frameworks são um conjunto de bibliotecas baseadas em um conceito, um design, e seu código deve se adequar a ele (não o contrário). Podemos citar como exemplos [Angular.js](https://angularjs.org/) e [Ext JS](http://www.sencha.com/products/extjs/).

Frameworks geralmente se encaixam no design pattern de [Inversão de Controle](https://pt.wikipedia.org/wiki/Invers%C3%A3o_de_controle).
Para saber mais, Martin Fowler tem [um ótimo artigo](http://martinfowler.com/bliki/InversionOfControl.html) sobre isso.

## E por que Polymer é uma Biblioteca?
Porque ele tem uma única e exclusiva função: facilitar a criação de Web Components. Só. Ele não vai se intrometer onde não é chamado e, quando você o chamar, vai fazer o que você pediu e nada mais.

# 3. Ele não é um Framework CSS / Showcase do Material Design
Apesar do site do projeto ser construído sobre a especificação do [Material Design](https://www.google.com/design/spec/material-design), também da Google, o Polymer não é "o futuro Bootstrap" (sim, eu já ouvi falarem isso). Polymer e Bootstrap não são nem comparáveis, mas a esse ponto você já deve saber o porquê: o primeiro é um framework CSS e o segundo, uma biblioteca JavaScript.

O que existem, na verdade, são **elementos baseados no Material Design**. Elementos customizados, criados com Polymer, como qualquer outro pode ser. Esses são chamados de [`paper-elements`](https://www.polymer-project.org/0.5/components/paper-elements/demo.html), que são nada mais nada menos que extensões dos elementos base ([`core-elements`](https://www.polymer-project.org/0.5/components/core-elements/demo.html)) com estilos e animações diferenciados.

O website do projeto tem um [catálogo](https://elements.polymer-project.org/) bem bacana com todos os elementos já disponíveis, e uma das categorias é justamente a dos Paper Elements. Outra fonte de elementos é o [customelements.io](https://customelements.io/), com elementos desenvolvidos por toda a comunidade. Com tudo isso, da próxima vez que você tiver que resolver um problema a primeira coisa que você vai pensar é *"tem um elemento pra isso"*!

---

Bom, espero que isso tenha esclarecido um pouco as coisas. Vale muito a pena aprender como funciona e como utilizar os Web Components, com ou sem Polymer, eles realmente são o futuro da web.
