"use strict";
define(['jquery',
        '../lib/init',
        '../lib/Game'],

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
    
      gameOptions = {
        world_width: 740,
        world_height: 640,
        runtime: 60
      };
      game = new Game(gameOptions, document.getElementById('world'), document.getElementById('bufferWorld'), sprites);

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
        FB.ui(
          {
            method :     'feed',
            link   :     'https://apps.facebook.com/projectilegame/',
            name   :     'projectile - a 2D space shooter',
            caption:     'https://apps.facebook.com/projectilegame/',
            description: 'I just scored ' + score + ' points - play this old-school action space shooter right in your browser and see how much you can score!',
            picture:     'http://stark-stream-6982.herokuapp.com/assets/images/logo75x75.png'
          },
          function (response) {
            window.location = window.location;
          }
        );
      });

      game.start();

    });
  });

});
