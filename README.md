# Babel Builtin Classes Fix

[![Build Status](https://travis-ci.org/WebReflection/babel-plugin-transform-builtin-classes.svg?branch=master)](https://travis-ci.org/WebReflection/babel-plugin-transform-builtin-classes) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/WebReflection/donate)

### About Babel 7

Babel 7 included this plugin in core so you don't need this plugin anymore.

- - -

Inspired by [Logan Smyth transformer](https://github.com/loganfsmyth/babel-plugin-transform-builtin-extend),
but actually very different.

This transformer aim is to fix once forever problems with native extends and Custom Elements.

```js
// finally fixed
class List extends Array {}
console.assert(new List instanceof List);

// finally fixed too
class MyElement extends HTMLElement {
  connectedCallback() {
    this.textContent = 'hello';
  }
}

customElements.define('my-element', MyElement);

const node = new MyElement;
console.assert(node.constructor === MyElement);
console.assert(node instanceof MyElement);
console.assert(node instanceof HTMLElement);

document.body.appendChild(node);
```

## Usage

In your Babel 6 configuration, for example in a `.babelrc` you might have the following,
which would enable the plugin and configure it to look for any class extending `HTMLElement`, `Error` or `Array` globals.

```js
{
  "plugins": [
    // either the preset es2015 or at least the following
    "babel-plugin-transform-es2015-classes",
    ["babel-plugin-transform-builtin-classes", {
      "globals": ["Array", "Error", "HTMLElement"]
    }]
  ]
}
```

**However**, you can find all known Chrome browser classes already listed in the file `lib/.babelrc` too.

#### Rollup

In this case you might need to invert the plugins order:
```js
{
  plugins: [
    ['transform-builtin-classes', {
      globals: ['HTMLElement']
    }],
    'transform-es2015-classes'
    // ... others ...
  ]
}
```


### Compatibility
This transformer works on IE11 and every other browser with `Object.setPrototypeOf` or `__proto__` as fallback.

There is **NO IE <= 10 support**. If you need IE <= 10 don't use this plugin and/or don't extend natives (recommended).


### About `logIfPatched` option
If you'd like to have a visual feedback when patched classes are encountered,
use the `logIfPatched: true` option.

```js
{
  "plugins": [
    ['transform-builtin-classes', {
      globals: ['Array'],
      logIfPatched: true
    }]
  ]
}
```

This will output (as `console.warn`) `✔ builtin extends patched` whenever a class is found.
