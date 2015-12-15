---
title:    Como Implementar o Efeito de Linha do Tempo em CSS
tagline:  Desenvolvendo o efeito de linha do tempo com CSS puro
tags:     css how-to
date:     2015-12-14

isDraft:  true
---

Vou tentar fazer pastagens mais frequentes, curtas e diretas. Para começar vou 
fazer um post rápido sobre como criar um efeito de 

```scss
$timeline-color: #080;
$timeline-column-size: 100px;
$timeline-bullet-size: $timeline-column-size / 2;
$timeline-line-width: $timeline-bullet-size / 3;

.bullets-target {
  padding-left: $timeline-column-size;
  position: relative;
  &::before {
    content: '';
    display: block;
    top: $timeline-bullet-size / 2;
    left: (($bullet-spacing / 2) - ($timeline-bullet-size / 2));
    width: $timeline-bullet-size;
    height: $timeline-bullet-size;
    background: $timeline-color;
    border-radius: 100%;
  }
  &:not(:last-child)::after {
    content: '';
    display: block;
    position: absolute;
    top: $timeline-bullet-size / 2;
    left: (($bullet-spacing / 2) - ($timeline-line-width/ 2));
    bottom: -(($timeline-bullet-size / 2) + 1);
    width: $timeline-line-width;
    background: $timeline-color;
  }
}
```
