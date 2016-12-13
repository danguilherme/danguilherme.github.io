---
title:    Introduzindo: Termux
tagline:  Um terminal completo na tela do seu Android
tags:     produtividade ferramentas android linux terminal
date:     2016-07-28T12:08:00+00:00

isDraft:    true
---

<style>
  .asciicast {
    text-align: center;
  }

  .asciicast iframe {
    max-width: 100%;
  }
</style>

<script type="text/javascript" src="https://asciinema.org/a/5y8vieg02u61epwjsi6gckevu.js" async
        id="asciicast-5y8vieg02u61epwjsi6gckevu"
        data-autoplay="1"
        data-loop="1"
        data-speed="4"></script>

Atualmente, podemos fazer de tudo a partir de um telefone celular: pagar contas, pedir comida,
chamar um motorista particular e, pasmem, ligar para pessoas de qualquer lugar do mundo
(tarifas podem ser cobradas™).

Adicione mais uma funcionalidade na imensa lista: **desenvolver software**.
Como um verdadeiro terminal portátil, o [Termux](https://termux.com/) te permite fazer isso e muito mais,
trazendo grande parte dos utilitários que utilizamos em qualquer sistema Unix para a palma da mão,
como `cat`, `grep` e `vim`, e também ferramentas como Node e <abbr title="Interactive Ruby">irb</abbr> (Ruby).

Nesse post introdutório, vou apresentar como instalar e tirar o melhor proveito desse terminal.

# Instalando o Termux
Baixe e instale o [app pela Google Play](https://play.google.com/store/apps/details?id=com.termux).

Por ser um viciado em atalhos, senti a necessidade de um teclado mais *hackudo* para mexer no terminal pelo celular.
E creio que não fui o único, pois existe o [Hacker's Keyboard](https://play.google.com/store/apps/details?id=org.pocketworkstation.pckeyboard): um teclado interessante, com teclas exclusivas para `ctrl`, `alt`, `shift`, e outras coisas que você encontra
em um teclado físico.
Apesar das [teclas de atalho do Termux](https://termux.com/touch-keyboard.html),
ainda o acho melhor para mexer no terminal.

Ao abrir o aplicativo, execute os seguintes comandos no terminal:
``` bash
$ apt update
```
Esse comando atualiza o índice de pacotes do gerenciador, então ele deve ser executado assim que
o app é instalado, mas também com frequência durante o dia a dia de uso.

> Após a execução desse comando, é comum a execução de:
> ``` bash
> $ apt upgrade
> ```
> Esse comando atualiza os pacotes instalados de acordo com sua versão nova no índice.
>
> Não se preocupe quanto a banda de internet, ele sempre pergunta se você tem certeza de fazer
> o download, mostrando quantos MB serão baixados.

Agora podemos começar a instalar pacotes.
O único básico que precisamos instalar é o `coreutils`.
Esse pacote provê alguns comandos básicos do shell que a maioria dos scripts por aí afora utilizam
(como o Rails).
``` bash
$ apt install coreutils
```
<script type="text/javascript" src="https://asciinema.org/a/910jufnkdx9al67jqndwsis2a.js" async
        id="asciicast-910jufnkdx9al67jqndwsis2a"
        data-autoplay="0"
        data-loop="0"
        data-speed="3"></script>






```
$ termux-setup-storage
```




-----

[Inspiração](https://medium.freecodecamp.com/building-a-node-js-application-on-android-part-1-termux-vim-and-node-js-dfa90c28958f#.4y05h2orc)

1. Instalar o [Termux](https://play.google.com/store/apps/details?id=com.termux)
    - Apesar das [teclas de atalho do Termux](https://termux.com/touch-keyboard.html), recomendo instalar um teclado com teclas iguais ao de um teclado convencional, como o [Hacker's Keyboard](https://play.google.com/store/apps/details?id=org.pocketworkstation.pckeyboard)
1. Ja roda `apt update`
    - This commands needs to be run initially directly after installation and regularly afterwards to receive updates.
1. Instalar `cowsay`
    - Fazer um hello world
1. Instalar package `coreutils`

    Esse pacote provê alguns comandos básicos do shell que a maioria dos scripts por aí afora utilizam (como o Rails, como veremos mais a frente)

    [Video instalando coreutils]
1. Instalar `ruby`
1. Instalar `rails`
1. Execute `termux-setup-storage` para gerar symlinks com pastas do sistema


<script type="text/javascript" src="https://asciinema.org/a/bsdiuvltg2wt4voqqe6m5aeyl.js" async
        id="asciicast-bsdiuvltg2wt4voqqe6m5aeyl"
        data-preload="1"
        data-speed="6"></script>