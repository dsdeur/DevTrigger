let currentTriggers = [];

const backgroundPageConnection = chrome.runtime.connect({
  name: 'DevtoolsExtension',
});

backgroundPageConnection.onMessage.addListener(message => {
  update();
});

backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId,
});

function logToConsole(name, result) {
  return `console.log('%c-> %c${name}', 'padding-bottom: 5px; color: #1f1f1f', 'color: blue', '\\n', ${result})`;
}

function onClick({ name, type }) {
  let call = `window.dt['${name}']`;

  // Call if it's a function
  if (type === 'function') {
    name = name + '()';
    call += '()';
  }

  // Wrap with console log
  call = logToConsole(name, call);

  // Actually run the function in the window
  chrome.devtools.inspectedWindow.eval(call, (value, exception) => {
    if (exception) {
      chrome.devtools.inspectedWindow.eval(
        logToConsole(name, `\`${exception.value.toString()}\``),
        (value, exception) => {
          console.log(value, exception);
        },
      );
    }
  });
}

function updateButtons(triggers) {
  const root = document.getElementById('root');

  triggers.forEach(t => {
    let elem = document.getElementById(t.name);

    if (!elem) {
      elem = document.createElement('input');
      elem.setAttribute('id', t.name);
      elem.type = 'button';
      elem.classList.add('dt-trigger');
      root.appendChild(elem);
    }

    elem.value = t.name;
    elem.onclick = () => onClick(t);
  });

  let keys = triggers.map(x => x.name);
  currentTriggers.filter(x => !keys.includes(x.name)).forEach(x => {
    let elem = document.getElementById(x.name);
    root.removeChild(elem);
  });

  currentTriggers = triggers;
}

function update() {
  chrome.devtools.inspectedWindow.eval(
    'Object.keys(window.dt).map(x => { return { name: x, type: typeof window.dt[x]}; })',
    (triggers, err) => {
      if (err) return;
      updateButtons(triggers);
    },
  );
}

update();
