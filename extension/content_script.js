function injectedScript() {
  window.postMessage(
    {
      name: 'update',
      type: 'set',
      source: 'devTrigger-devtools-extension',
    },
    '*',
  );

  let dt = {};

  const handler = {
    set(obj, prop, value) {
      window.postMessage(
        {
          name: 'update',
          type: 'set',
          source: 'devTrigger-devtools-extension',
        },
        '*',
      );

      return Reflect.set(...arguments);
    },
  };

  window.dt = new Proxy(dt, handler);
}

// Inject the injected_script
var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + injectedScript + ')();'));
(document.body || document.head || document.documentElement).appendChild(
  script,
);

window.addEventListener('message', function(event) {
  // Only accept messages from the same frame
  if (event.source !== window) {
    return;
  }

  var message = event.data;

  // Only accept messages that we know are ours
  if (
    typeof message !== 'object' ||
    message === null ||
    !message.source === 'devtrigger-devtools-extension'
  ) {
    return;
  }

  // Forward the message
  chrome.runtime.sendMessage(message);
});
