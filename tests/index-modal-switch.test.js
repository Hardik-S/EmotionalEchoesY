const fs = require('fs');
const path = require('path');
const vm = require('vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');

function createElement(id, initialClasses = []) {
  const listeners = {};
  const classes = new Set(initialClasses);

  return {
    id,
    listeners,
    value: '',
    textContent: '',
    classList: {
      add: (className) => classes.add(className),
      remove: (className) => classes.delete(className),
      contains: (className) => classes.has(className),
    },
    addEventListener: (event, callback) => {
      listeners[event] = callback;
    },
    click: () => {
      if (listeners.click) {
        listeners.click();
      }
    },
  };
}

function bootIndexPage() {
  const elements = {
    'login-btn': createElement('login-btn'),
    'signup-btn': createElement('signup-btn'),
    'login-modal': createElement('login-modal', ['active']),
    'signup-modal': createElement('signup-modal'),
    'login-form': createElement('login-form'),
    'signup-form': createElement('signup-form'),
    'to-signup': createElement('to-signup'),
    'to-login': createElement('to-login'),
  };
  const domReadyCallbacks = [];

  const context = {
    console,
    alert: () => {},
    localStorage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    },
    document: {
      getElementById: (id) => elements[id] || null,
      querySelectorAll: () => [],
      addEventListener: (event, callback) => {
        if (event === 'DOMContentLoaded') {
          domReadyCallbacks.push(callback);
        }
      },
    },
    window: {
      location: { pathname: '/index.html', href: '/index.html' },
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

  return elements;
}

function assertActiveState(element, expected, label) {
  const actual = element.classList.contains('active');
  if (actual !== expected) {
    throw new Error(`${label}: expected active=${expected}, received ${actual}`);
  }
}

const elements = bootIndexPage();

elements['to-signup'].click();
assertActiveState(elements['signup-modal'], true, 'signup switch opens signup modal');
assertActiveState(elements['login-modal'], false, 'signup switch closes login modal');

elements['to-login'].click();
assertActiveState(elements['login-modal'], true, 'login switch opens login modal');
assertActiveState(elements['signup-modal'], false, 'login switch closes signup modal');

elements['signup-btn'].click();
assertActiveState(elements['signup-modal'], true, 'signup CTA opens signup modal');
assertActiveState(elements['login-modal'], false, 'signup CTA closes login modal');

console.log('index-modal-switch test passed');
