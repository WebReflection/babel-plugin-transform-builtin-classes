
require('babel-core').transformFile(
  __dirname + '/cool-element.js',
  {
    "plugins": [
      [require('../lib/index.js').default, {
        globals: ['HTMLElement']
      }]
    ]
  },
  function (err, result) {
    if (err) (console.error(err), process.exit(1));
    else require('fs').writeFile(
      __dirname + '/cool-element.es5.js',
      result.code,
      function (err) {
        if (err) (console.error(err), process.exit(1));
      }
    );
  }
);