# Polyglot Plugin for [DocPad](http://docpad.org)

<!-- BADGES/ -->

<span class="badge-npmversion"><a href="https://npmjs.org/package/docpad-plugin-polyglot" title="View this project on NPM"><img src="https://img.shields.io/npm/v/docpad-plugin-polyglot.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/docpad-plugin-polyglot" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/docpad-plugin-polyglot.svg" alt="NPM downloads" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/danguilherme/docpad-plugin-polyglot" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/danguilherme/docpad-plugin-polyglot.svg" alt="Dependency Status" /></a></span>
<span class="badge-daviddmdev"><a href="https://david-dm.org/danguilherme/docpad-plugin-polyglot#info=devDependencies" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/danguilherme/docpad-plugin-polyglot.svg" alt="Dev Dependency Status" /></a></span>

<!-- /BADGES -->


Add multilanguage support for your site.

Heavily inspired and mostly based on [multilang](https://www.npmjs.com/package/docpad-plugin-multilang) and <del>the abandoned</del> [multilanguage](https://www.npmjs.com/package/docpad-plugin-multilanguage) plugins.


<!-- INSTALL/ -->

<h2>Install</h2>

Install this DocPad plugin by entering <code>docpad install polyglot</code> into your terminal.

<!-- /INSTALL -->


<h2>Configuration</h2>

|Config|Default|Description|
|---|---|---|
|**mainLanguage**|*(required)*|The main language of the website. There is no specific format, but it is recommended to use some language code pattern, like [IANA](https://www.w3.org/International/questions/qa-html-language-declarations), [ISO](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) or [IETF](https://en.wikipedia.org/wiki/IETF_language_tag).|
|**languages**|*(required)*|The languages the website will be translated into.|
|**omitMainFolder**|`true`|Whether the main language files should be in the root of the website or have its own folder.|

<h2>Usage</h2>

### Configuration
Add the necessary configuration into docpad.js:

```javascript
plugins: {
  polyglot: {
    mainLanguage: "pt-br",
    languages: ["pt-br", "en"]
  }
}
```

### Directory Structure
As `omitMainFolder` is `true` by default, only languages different from `mainLanguage` need to be inside its own folder:

```bash
project-folder
└─src/
  └─documents/
    ├─index.html # home in brazilian portuguese
    ├─sobre.html # brazilian portuguese
    └─en/ # all in english
      ├─index.html
      └─about.html
```

The generated URLs would be:

```
/index.html
/sobre.html
/en/index.html
/en/about.html
```

However, if `omitMainFolder` is `false`, each file must be inside its language folder, even for the main language:

```bash
project-folder
└─src/
  └─documents/
    ├─en/ # all in english
    │ ├─index.html
    │ └─about.html
    └─pt-br/ # all in brazilian portuguese
      ├─index.html
      └─sobre.html
```

The generated URLs would be:

```
/pt-br/index.html
/pt-br/sobre.html
/en/index.html
/en/about.html
```

### How translations for a page are determined
At first the metadata of the page is searched for a dictionary named `translations`. In this dictionary if there are entries with the language keys then it is assumed that these pages are the translation of the current page. For instance for the page /postagem-poliglota.html, if there is a header

```
---
title: "Sobre"
layout: "default"
translations:
  en: about.html
---
```
then `/en/about.html` is assumed to be the translation to `en` of this page.

> Note that the dictionary value (`about.html`) **doesn't have any additional extension** (eg. `.html.md`). It's only necessary to put the final extension in it.

For languages that are not specified with the `translations` dictionary, it is assumed that the name (including the path without the language directory) of the translated page is the same. In the above example, the file `/en/sobre.html` would be assumed as the `en` translation. If no such page is found in the database then it is assumed that there is no translation of the current page to that language.

### Injected template data
The plugin injects some properties and functions into the template data so that they can be used in the template.

The functions are:
- `date({ date, format, lang })`: Print the date of the article in a localized form. Takes several optional parameter: `date` and `lang` to use different values than the ones of the document. `format` to use a different date format as specified by [Moment.js](https://momentjs.com/) (defaults to `LL`).
- `hasLang(lang)`: Whether there is a translation of the current page to that language.
- `toLang(lang)`: Receives a language code as parameter and returns the URL of the translation of the current page. If there is no translation, it returns `undefined`.
- `otherLangs()`: Dictionary with the other languages and their URLs that are available for this document. The object structure is `{ "<language>": "<translation URL>" }`
- `langFromUrl(url)`: Allow to obtain current language from URL if `@document.lang` isn't available. Using `@document.lang` is prefered for performance.

The properties are:
- `mainLanguage`: The main language, set on config
- `languages`: List of the languages, set on config

### Template data in use
Using the example defined above, if we wrote the following code into `/en/about.html.eco`:

```
- Lang: <%= @document.lang %>
- Lang from URL: <%= @langFromUrl(@document.url) %>
- Translation: <%= @toLang('pt-br') %>
- Has Portuguese: <%= @hasLang('pt-br') %>
- Has English: <%= @hasLang('en') %>
- Other languages: <%= JSON.stringify(@otherLangs()) %>
```

We would see the following output:
```
- Lang: en
- Lang from URL: en
- Translation: /sobre.html
- Has Portuguese: true
- Has English: true
- Other languages: { "pt-br": "/sobre.html" }
```

### Injected document data
Properties are also injected into each document. They are:

- `lang`: The language of the document.
- `translationURLs`: Dictionary with all translations to the current page (including itself). Probably unnecessary with the functions in the template data.

### Generated collections
For every language, a collection whose name is composed from `lang_<language>` is automatically created containing all files that have this language. For instance for the language `pt-br` there is a collection named `lang_pt-br`.

<!-- HISTORY/ -->

<h2>History</h2>

<a href="https://github.com/danguilherme/docpad-plugin-polyglot/blob/master/HISTORY.md#files">Discover the release history by heading on over to the <code>HISTORY.md</code> file.</a>

<!-- /HISTORY -->


<!-- CONTRIBUTE/ -->

<h2>Contribute</h2>

<a href="https://github.com/danguilherme/docpad-plugin-polyglot/blob/master/CONTRIBUTING.md#files">Discover how you can contribute by heading on over to the <code>CONTRIBUTING.md</code> file.</a>

<!-- /CONTRIBUTE -->


<!-- BACKERS/ -->

<h2>Backers</h2>

<h3>Maintainers</h3>

These amazing people are maintaining this project:

<ul><li><a href="http://danguilherme.github.io/">Guilherme Ventura</a> — <a href="https://github.com/danguilherme/docpad-plugin-polyglot/commits?author=danguilherme" title="View the GitHub contributions of Guilherme Ventura on repository danguilherme/docpad-plugin-polyglot">view contributions</a></li></ul>

<h3>Sponsors</h3>

No sponsors yet! Will you be the first?



<h3>Contributors</h3>

These amazing people have contributed code to this project:

<ul><li><a href="http://danguilherme.github.io/">Guilherme Ventura</a> — <a href="https://github.com/danguilherme/docpad-plugin-polyglot/commits?author=danguilherme" title="View the GitHub contributions of Guilherme Ventura on repository danguilherme/docpad-plugin-polyglot">view contributions</a></li>
<li><a href="http://balupton.com">Benjamin Lupton</a> — <a href="https://github.com/danguilherme/docpad-plugin-polyglot/commits?author=balupton" title="View the GitHub contributions of Benjamin Lupton on repository danguilherme/docpad-plugin-polyglot">view contributions</a></li>
<li><a href="http://mdm.cc">Michael Duane Mooring</a> — <a href="https://github.com/danguilherme/docpad-plugin-polyglot/commits?author=mikeumus" title="View the GitHub contributions of Michael Duane Mooring on repository danguilherme/docpad-plugin-polyglot">view contributions</a></li>
<li><a href="http://robloach.net">Rob Loach</a> — <a href="https://github.com/danguilherme/docpad-plugin-polyglot/commits?author=RobLoach" title="View the GitHub contributions of Rob Loach on repository danguilherme/docpad-plugin-polyglot">view contributions</a></li>
<li><a href="https://github.com/vsopvsop">vsopvsop</a> — <a href="https://github.com/danguilherme/docpad-plugin-polyglot/commits?author=vsopvsop" title="View the GitHub contributions of vsopvsop on repository danguilherme/docpad-plugin-polyglot">view contributions</a></li></ul>

<a href="https://github.com/danguilherme/docpad-plugin-polyglot/blob/master/CONTRIBUTING.md#files">Discover how you can contribute by heading on over to the <code>CONTRIBUTING.md</code> file.</a>

<!-- /BACKERS -->


<!-- LICENSE/ -->

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; <a href="http://danguilherme.github.io/">Guilherme Ventura</a></li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/MIT.html">MIT License</a></li></ul>

<!-- /LICENSE -->
