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
