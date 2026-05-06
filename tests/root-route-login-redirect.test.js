const fs = require('fs');
const vm = require('vm');

const source = fs.readFileSync(require('path').join(__dirname, '..', 'script.js'), 'utf8');

function runApp(pathname, currentUser) {
  const storage = new Map();
  if (currentUser) {
    storage.set('currentUser', currentUser);
  }

  const domReadyCallbacks = [];
  const location = { pathname, href: pathname };
  const context = {
    console,
    alert: () => {},
    localStorage: {
      getItem: (key) => (storage.has(key) ? storage.get(key) : null),
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: (key) => storage.delete(key),
    },
    document: {
      getElementById: () => null,
      querySelectorAll: () => [],
      addEventListener: (event, callback) => {
        if (event === 'DOMContentLoaded') {
          domReadyCallbacks.push(callback);
        }
      },
    },
    window: {
      location,
      addEventListener: () => {},
    },
    setTimeout: () => 0,
    clearTimeout: () => {},
    setInterval: () => 0,
    clearInterval: () => {},
  };

  context.window.document = context.document;
  vm.createContext(context);
  vm.runInContext(source, context);
  domReadyCallbacks.forEach((callback) => callback());
  return location.href;
}

function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`${label}: expected ${expected}, received ${actual}`);
  }
}

assertEqual(runApp('/index.html', 'Hardik'), 'headspace.html', 'explicit index login redirect');
assertEqual(runApp('/', 'Hardik'), 'headspace.html', 'root login redirect');

console.log('root-route-login-redirect test passed');
