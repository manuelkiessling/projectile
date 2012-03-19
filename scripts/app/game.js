"use strict";
define(['jquery',
        '../lib/SpriteLoader',
        '../lib/util',
        'update',
        'draw',
        'collider',
        '../domain/Player',
        '../domain/Enemy',
        '../domain/Bullet',
        '../domain/Explosion',
        '../domain/Tile',
        'TerrainBuilder',
        '../vendor/requestAnimFrame',
        '../vendor/requestInterval',
        '../vendor/requestTimeout',
        '../vendor/webgl-2d',
        '../vendor/browserdetect'
       ],

function($, SpriteLoader, util, update, draw, collider, Player, Enemy, Bullet, Explosion, Tile, TerrainBuilder) {

  var play = function() {
    $('#worldbox').focus();

    var sprites = {};

    var loadCounter = 1;
    var interval = setInterval(function() {
      loadCounter++;
      $('#loadbar').css('width', 10 * loadCounter);
    }, 1000);

    var spriteNames = ['terrain_mars1', 'terrain_mars2', 'enemy', 'enemy_turquoise', 'enemy2', 'player2', 'playerBullet', 'enemyBullet'];
    for (var i=0; i < 17; i++) {
      spriteNames.push('explosion/explosion-' + i);
    }

    var spriteLoader = new SpriteLoader();
    spriteLoader.load('assets/images', spriteNames, '.png', function(loadedSprites) {
      sprites = loadedSprites;
      $('#loadscreen').css('display', 'none');
      clearInterval(interval);
      start();
    });

    var start = function() {
      var canvas = document.getElementById('world');

      if (util.webglEnabled()) {
        $('#webglnote').html('WebGL is enabled');
        WebGL2D.enable(canvas);
        var context = canvas.getContext('webgl-2d');
      } else {
        $('#webglnote').html('WebGL is disabled');
        var context = canvas.getContext('2d');
      }

      var World = function() {
        this.sprites = sprites;
      };

      World.prototype.drawImageData = function(imageData, x, y) {
        this.canvas.putImageData(imageData, x, y);
      };

      World.prototype.drawSprite = function(spriteName, x, y, width, height) {
        if (this.sprites[spriteName]) {
          if (!width) {
            width = sprites[spriteName].width;
          }
          if (!height) {
            height = sprites[spriteName].height;
          }
          this.canvas.drawImage(this.sprites[spriteName], x, y, width, height);
        }
      };

      World.prototype.drawImage = function(image, x, y, width, height) {
        this.canvas.drawImage(image, x, y, width, height);
      }

      World.prototype.drawRectangle = function(color, x, y, width, height) {
        this.canvas.fillStyle = color;
        this.canvas.fillRect(x, y, width, height);
      };

      World.prototype.addHit = function() {
        this.hits++;
        $('#hits').html('' + this.hits + '');
      };

      World.prototype.substractHit = function() {
        if (!this.hits === 0) this.hits--;
        $('#hits').html('' + this.hits + '');
      };

      var world = new World();
      world.canvas = context;
      world.width = 740;
      world.height = 640;
      world.fps = 40;
      world.remainingTime = 5;
      world.hits = 0;
      world.terrainSpeed = 1;
      world.players = [];
      world.enemies = [];
      world.bullets = [];
      world.explosions = [];
      world.tiles = [];

      world.players.push(new Player(world, Bullet, Explosion, {
        keyleft: 'left',
        keyright: 'right',
        keyup: 'up',
        keydown: 'down',
        keyfire: 'space'
      }));

      /*
       world.players.push(new Player(world, Bullet, {
       keyleft: 'a',
       keyright: 'd',
       keyup: 'w',
       keydown: 's',
       keyfire: 'q'
       }));
       */

      world.terrainBuilder = new TerrainBuilder(world, Tile);

      // Game loop
      var gameloop = requestInterval(function() {
        collider(world);
        update(world, Enemy, Bullet, Explosion);
        draw(world);
      }, 1000 / world.fps);

      var timerloop = requestInterval(function() {
        world.remainingTime--;
        $('#time').html('' + world.remainingTime + '');
      }, 1000);

      requestTimeout(function() {
        clearRequestInterval(gameloop);
        clearRequestInterval(timerloop);
        $('#gameoverhits').html('' + world.hits + '');
        $('#gameoverscreen').show();
        FB.ui(
          {
            method :     'feed',
            link   :     'https://apps.facebook.com/projectilegame/',
            name   :     'projectile - a 2D space shooter',
            caption:     'https://apps.facebook.com/projectilegame/',
            description: 'I just scored ' + world.hits + ' points - play this old-school action space shooter right in your browser and see how much you can score!',
            picture:     'http://stark-stream-6982.herokuapp.com/assets/images/logo75x75.png'
          },
          function (response) {
            window.location = window.location;
          }
        );
      }, world.remainingTime * 1000);

      requestInterval(function() {
        //console.log(player.bullets);
        //console.log(enemies);
      }, 1000);
    };
  };

  return { play: play };

});
// http://www.html5rocks.com/en/tutorials/canvas/notearsgame/
