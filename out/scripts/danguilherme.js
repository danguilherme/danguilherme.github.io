'use strict';;(function(window,document,undefined){var onLoadFns=[];var documentIsReady=false;document.addEventListener('readystatechange',function(){if(document.readyState=='complete')onDocumentReady();});function onDocumentReady(){var documentIsReady=true;onLoadFns.forEach(function(fn){return executeOnLoadFunction(fn);});onLoadFns=[];};function executeOnLoadFunction(fn){if(typeof fn!=='function')return;fn.call(window);}window.onDocumentReady=function danguilherme(onLoad){if(typeof onLoad!=='function'){console.warn("`onDocumentReady` only accepts functions to execute when document is ready");return;}if(documentIsReady)executeOnLoadFunction(onLoad);else onLoadFns.push(onLoad);};window.danguilherme=window.onDocumentReady;})(window,document);