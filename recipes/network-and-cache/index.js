/*
The service worker in this recipe tries to retrieve the most up to date content from the network but if the network is taking too much, it will serve cached content instead.
*/

navigator.serviceWorker.register('service-worker.js', {
  scope: './controlled'
});

navigator.serviceWorker.ready.then(reload);

var referenceIframe = document.getElementById('reference');
var sampleIframe = document.getElementById('sample');

referenceIframe.onload = fixHeight;
sampleIframe.onload = fixHeight;

var reloadButton = document.querySelector('#reload');
reloadButton.onclick = reload;

function loadIframes() {
  referenceIframe.src = './non-controlled.html';
  sampleIframe.src = './controlled.html';
}

function fixHeight(event) {
  var iframe = event.target;
  var document = iframe.contentWindow.document.documentElement;
  iframe.style.height = document.getClientRects()[0].height + 'px';

  if (window.parent !== window) {
    window.parent.document.body.dispatchEvent(new CustomEvent('iframeresize'));
  }
}

function reload() {
  referenceIframe.contentWindow.location.reload();
  sampleIframe.contentWindow.location.relaod();
}