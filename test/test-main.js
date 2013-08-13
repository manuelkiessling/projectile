var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

var jQuery;

requirejs.config({
      // Karma serves files from '/base'
      baseUrl: '/base/htdocs/js',

      paths: {
        'jquery': 'vendor/jquery',
      },

      shim: {
        'vendor/jquery.hotkeys': ['jquery'],
      },

      // ask Require.js to load these files (all our tests)
      deps: tests,

      // start test run, once Require.js is done
      callback: function() {
        window.__karma__.start();
      }
});
