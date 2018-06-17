// console.log('hello from devtools');

// // DevTools page -- devtools.js
// // Create a connection to the background page
// var backgroundPageConnection = chrome.runtime.connect({
//   name: 'devtools-page',
// });

// backgroundPageConnection.onMessage.addListener(function(message) {
//   // Handle responses from the background page, if any
//   console.log('yoyoyo from devtools', message);
// });

// // Relay the tab ID to the background page
// chrome.runtime.sendMessage({
//   tabId: chrome.devtools.inspectedWindow.tabId,
//   scriptToInject: 'content_script.js',
// });

/**
 * Created by apesant on 27/07/16.
 */
(function() {
  var backgroundPageConnection = chrome.runtime.connect({
    name: 'devtools-page',
  });

  backgroundPageConnection.onMessage.addListener(function(message) {
    // Handle responses from the background page, if any
  });

  backgroundPageConnection.postMessage({
    name: 'init',
    tabId: chrome.devtools.inspectedWindow.tabId,
  });

  backgroundPageConnection.postMessage({
    name: 'execScript',
    tabId: chrome.devtools.inspectedWindow.tabId,
    scriptToInject: 'content_script.js',
  });

  chrome.devtools.panels.create(
    'DevTrigger',
    'favicon-32x32.png',
    'panel.html',
    panel => {},
  );
})();
