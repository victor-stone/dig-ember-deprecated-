/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

    /** bootstrap **/
    
    app.import('bower_components/bootstrap/dist/css/bootstrap.css');
    app.import('bower_components/bootstrap/dist/css/bootstrap-theme.css');
    app.import('bower_components/bootstrap/dist/js/bootstrap.js');

    var bootstrapFonts = new Funnel('bower_components/bootstrap/dist/fonts', {
                destDir: 'fonts'
                });
                
    /** soundManager **/
    
    app.import({
            development: 'bower_components/soundmanager/swf/soundmanager2_debug.swf',
            production: 'bower_components/soundmanager/swf/soundmanager2.swf'
        });
    app.import({
            development: 'bower_components/soundmanager/script/soundmanager2.js',
            production: 'bower_components/soundmanager/script/soundmanager2-nodebug-jsmin.js'
        });
    app.import('bower_components/ember-cli-soundmanager-shim/soundmanager2-shim.js', {
            exports: {
              soundManager: ['default']
            }
        });

    /*
    app.import('bower_components/soundmanager/demo/bar-ui/script/bar-ui.js');
    app.import('bower_components/soundmanager/demo/bar-ui/css/bar-ui.css');
    var smImages = new Funnel('bower_components/soundmanager/demo/bar-ui/image', {
                destDir: 'image'
                });
    */
    
  return app.toTree( [ bootstrapFonts, /* smImages */] );
};
