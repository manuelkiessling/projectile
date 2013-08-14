"use strict";

requirejs.config({
  baseUrl: './js',
  paths: {
    'jquery': 'vendor/jquery',
  },
});

define(['jquery',
        'lib/init',
        'lib/Game'],

function($, init, Game) {

  var loadCounter;
  var game;
  var gameOptions;
  var score;
  var remainingTime = 60;

  // Grow a status bar while initializing the game
  loadCounter = 1;
  var loadInterval = setInterval(function() {
    loadCounter++;
    $('#loadbar').css('width', 10 * loadCounter);
  }, 100);

  // initialize the game
  init(function(sprites) {

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
        healthinfoValue: $('#healthinfo-value'),
      };
      game = new Game(gameOptions, document.getElementById('world'), document.getElementById('bufferWorld'), interfaceDomElements, sprites);

      game.on('webglDetectionFinished', function(hasWebgl) {
        if (hasWebgl) {
          $('#webglnote').html('WebGL is enabled');
        } else {
          $('#webglnote').html('WebGL is disabled');
        }
      });

      var gametimeInterval;
      game.on('start', function() {
        gametimeInterval = setInterval(function() {
          remainingTime--;
          $('#time').html('' + remainingTime + '');
        }, 1000);
      });

      score = 0;
      game.on('enemyIsKilled', function() {
        score++;
        $('#score').html('' + score + '');
      });

      game.on('playerIsHit', function() {
        if (score > 0) {
            score--;
          }
          $('#score').html('' + score + '');
      });

      game.on('end', function() {
        clearInterval(gametimeInterval);
        $('#gameoverscore').html('' + score + '');
        $('#gameoverscreen').show();
      });

      game.start();

    });
  });

});
