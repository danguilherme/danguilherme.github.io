---
title:    Afinal, o que é o Polymer?
tagline:  Respondendo de uma vez por todas o que realmente é a biblioteca da Google (e principalmente: o que ela não é)
tags:     web-components polymer Google custom-elements
date:     2015-06-24

isDraft:    true
---

É muito comum nos depararmos com essa pergunta, sejam em fóruns, grupos do Facebook e até eventos da área. Infelizmente, também é muito comum obtermos respostas vagas ou até mesmo equivocadas sobre ela. E quando essas respostas vão se espalhando como em um telefone sem fio o desentendimento fica ainda maior.

Esse artigo vai te dar a resposta exata do que o Polymer é e, principalmente, o que ele **não é**.

# 1. Ele não é um polyfill para a tecnologia dos Web Components
*Web Components: O futuro da web*. Você já deve ter visto isso em muitos lugares, e com certeza o Polymer ou foi citado ou foi o assunto principal, e por isso muitas pessoas confundem.

Polymer é uma biblioteca que **facilita** a criação de Web Components, que são elementos HTML customizados, independentes e reutilizáveis. A ideia é trazer essa tecnologia de ponta para os dias de hoje, deixando seu uso mais simples.

O problema é que a especificação dos Web Components, que agrega Custom Elements, HTML Template, Shadow DOM e HTML Imports, além de ser recente, ainda está em rascunho, não foi finalizada. Os browsers mais recentes (lê-se Google Chrome e Mozilla Firefox) suportam essa tecnologia experimentalmente sob uma flag, mas nossos usuários não terão (e nem devem ter) essas flags ativadas. E é aí que entra o verdadeiro pollyfiill, [`webcomponents.js`](https://github.com/WebComponents/webcomponentsjs). Esse é o cara responsável por trazer as especificações dos Web Components para os browsers atuais. **``webcomponents.js`** é o polyfill. O Polymer precisa que ele esteja carregado para funcionar nos browsers atualmente.

Existem outras bibliotecas com o mesmo intuito

O Polymer tem como sua principal feature a expressividade e o "[Açúcar Sintático](https://pt.m.wikipedia.org/wiki/A%C3%A7%C3%BAcar_sint%C3%A1tico)"

## Sem Jequiti
https://github.com/webcomponents/hello-world-element/blob/master/hello-world.html

## Com Jequiti
https://github.com/webcomponents/hello-world-polymer/blob/master/hello-world.html

# 2. Ele é uma biblioteca, não um framework


# 3. Ele não é um framework CSS
# 3. Ele não é uma biblioteca do novo Material Design


# Referências:

- https://www.facebook.com/groups/desenvolvimentoweb/permalink/899772396747867/?comment_id=900186873373086&offset=0&total_comments=37&comment_tracking=%7B%22tn%22%3A%22R9%22%7D
- http://pt.stackoverflow.com/questions/23619/o-que-%C3%A9-o-google-polymer/23658#23658
- Não é "Material design": https://youtu.be/0LT6W5QVCJI?t=15m21s
