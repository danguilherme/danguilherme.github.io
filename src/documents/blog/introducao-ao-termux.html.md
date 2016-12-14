---
title:    Introdução ao Termux
tagline:  Um terminal completo na tela do seu Android
tags:     produtividade ferramentas android linux terminal
date:     2016-12-14T02:00:00+00:00
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

## Instalando o Termux
Baixe e instale o [app pela Google Play](https://play.google.com/store/apps/details?id=com.termux).

Por ser viciado em atalhos, senti a necessidade de um teclado mais *hackudo* para mexer no terminal.
Creio que não fui o único, pois existe o [Hacker's Keyboard](https://play.google.com/store/apps/details?id=org.pocketworkstation.pckeyboard),
um teclado com teclas exclusivas para `ctrl`, `alt`, `shift`, e outras coisas que você encontra em
um teclado físico convencional.
Apesar das [teclas de atalho do Termux](https://termux.com/touch-keyboard.html),
ainda o acho melhor para mexer no terminal.

Ao abrir o aplicativo, execute os seguintes comandos no terminal:
``` bash
$ apt update
```
Esse comando atualiza o índice de pacotes do gerenciador, então ele deve ser executado assim que
o app é instalado, e também com uma certa frequência durante o uso no dia a dia.

## Configurando o Terminal
Após a execução do `apt update`, é comum a execução do seguinte comando:
``` bash
$ apt upgrade
```
O `apt upgrade` atualiza os pacotes instalados de acordo com sua versão atualizada no índice.

Não se preocupe quanto à banda de internet, o Termux sempre confirma se você tem certeza de fazer
o download antes de fazê-lo, mostrando quantos MB serão baixados.

Agora podemos começar a instalar pacotes.
O único pacote **essencial** que precisamos instalar é o `coreutils`.
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

## Armazenamento
Existem três tipos de [armazenamento no Termux](https://termux.com/storage.html):

1. **Armazenamento do aplicativo:** É onde você está quando inicia o Termux (valor da variável `$HOME`).
2. **Armazenamento interno compartilhado:** Armazemanto disponível para todos os apps, no dispositivo.
3. **Armazenamento externo:** Armazenamento no cartão de memória.

Para facilitar na navegação entre essas áreas, recomendo a execução do seguinte comando:
``` bash
$ termux-setup-storage
```
Esse comando, [como explicado na documentação](https://termux.com/storage.html), garante a permissão de leitura
de arquivos e cria a pasta `$HOME/storage`. O conteúdo dessa pasta são vários atalhos para armazenamentos do sistema,
entre eles:

- `~/storage/shared`<br>
  A raíz do **armazenamento interno compartilhado**.
- `~/storage/external`<br>
  A raíz do **armazenamento externo**, se houver.

## Hello World
Agora que está tudo certo, vamos ver se isso é um terminal de verdade usando o clássico pacote `cowsay`:

``` bash
$ apt install cowsay
$ cowsay "Olá, Termux"
```
<script type="text/javascript" src="https://asciinema.org/a/bsdiuvltg2wt4voqqe6m5aeyl.js" async
        id="asciicast-bsdiuvltg2wt4voqqe6m5aeyl"
        data-autoplay="0"
        data-loop="0"
        data-t="40"
        data-speed="6"></script>

Funciona que é uma beleza.

*Ao infinito e além!*

---

Seja no caminho do trabalho, ou pra checar aquele comando na hora do almoço (quem nunca?),
você pode recorrer ao Termux sempre que precisar, e ele dificilmente te deixará na mão.
Já consegui criar e subir uma aplicação Rails no celular, testando no próprio navegador.
É lindo cara.

Espero ter feito uma boa introdução ao Termux, pois acredito que esse é um daqueles apps que vale
a pena compartilhar com os coleguinhas.
Esse post foi inspirado em um post do [Free Code Camp](https://www.freecodecamp.com/):
[Building a Node.js application on Android - Part 1: Termux, Vim and Node.js](https://medium.freecodecamp.com/building-a-node-js-application-on-android-part-1-termux-vim-and-node-js-dfa90c28958f#.4y05h2orc).