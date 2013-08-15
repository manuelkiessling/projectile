"use strict";

requirejs.config({
  baseUrl: './js',
  paths: {
    'jquery': 'vendor/jquery',
  },
});

define(['jquery',
        'lib/util',
        'lib/loadSprites',
        'lib/Game'],

function($, util, loadSprites, Game) {

  var loadCounter;
  var game;
  var gameOptions;
  var score;
  var remainingTime = 60;

  var andStartGame = function(sprites) {

    clearInterval(loadInterval); // stop growing the status bar
    $('#loadscreenloading').hide();
    $('#loadscreenstart').show();
    $('#startlink').click(function() {
      $('#loadscreen').hide();
    
      var gameOptions = {
        world_width: 740,
        world_height: 640,
        runtime: 60
      };

      var interfaceDomElements = {
        healthinfoBar: $('#healthinfo-bar'),
        healthinfoMaxbar: $('#healthinfo-maxbar'),
      };

      var context;
      var canvas = document.getElementById('world');
      if (util.webglEnabled()) {
        WebGL2D.enable(canvas);
        context = canvas.getContext('webgl-2d');
        $('#webglnote').html('WebGL is enabled');
      } else {
        context = canvas.getContext('2d');
        $('#webglnote').html('WebGL is disabled');
      }

      game = new Game(gameOptions, document.getElementById('world'), document.getElementById('bufferWorld'), interfaceDomElements, context, sprites);

      var gametimeInterval;
      game.on('start', function() {
        $('.interfaceelement').show();
        gametimeInterval = setInterval(function() {
          remainingTime--;
          $('#time').html('' + remainingTime + '');
        }, 1000);
      });

      game.on('end', function() {
        $('.interfaceelement').hide();
        clearInterval(gametimeInterval);
        $('#gameoverscore').html('' + score + '');
        $('#gameoverscreen').show();
      });

      game.start();

    });
  };

  // Grow a status bar while loading sprites
  loadCounter = 1;
  var loadInterval = setInterval(function() {
    loadCounter++;
    $('#loadbar').css('width', 10 * loadCounter);
  }, 100);

  loadSprites(andStartGame);

});
