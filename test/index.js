require('babel-core').transformFile(
  __dirname + '/test.js',
  {
    "plugins": [
      [require('../lib/index.js').default, {
        globals: ['Array'],
        logIfPatched: true
      }]
    ]
  },
  function (err, result) {
    if (err) (console.error(err), process.exit(1));
    else require('fs').writeFile(
      __dirname + '/test.es5.js',
      result.code,
      function (err) {
        if (err) (console.error(err), process.exit(1));
      }
    );
  }
);