"use strict";
define(['jquery',
        'update',
        'draw',
        'collider',
        'Player',
        'Enemy',
        'Bullet',
        'Explosion',
        'TerrainBuilder',
        'Tile',
        '../lib/SpriteAnimation'
       ],

function($, update, draw, collider, Player, Enemy, Bullet, Explosion, TerrainBuilder, Tile, SpriteAnimation) {

  var sprites = {};
  var spriteCounter = 0;

  var loadCounter = 1;
  var interval = setInterval(function() {
    loadCounter++;
    $('#loadbar').css('width', 10 * loadCounter);
  }, 1000);

  var spriteNames = ['terrain_mars', 'enemy', 'player', 'playerBullet'];
  for (var i=0; i < 17; i++) {
    spriteNames.push('explosion/explosion-' + i);
  }
  spriteNames.forEach(function(spriteFile) {
    var img = new Image();
    img.onload = function() {
      spriteCounter++;
      sprites[spriteFile] = img;
      if (spriteCounter === spriteNames.length) {
        $('#loadscreen').css('display', 'none');
        clearInterval(interval);
        start();
      }
    };
    img.src = 'assets/images/' + spriteFile + '.png';
  });

  var start = function() {
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


    var world = new World();

    world.canvas = document.getElementById('world').getContext('2d');
    world.width = 960;
    world.height = 640;
    world.fps = 40;
    world.remainingTime = 60;
    world.hits = 0;
    world.terrainSpeed = 2;
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
    setInterval(function() {
      collider(world);
      update(world, Enemy, Bullet, Explosion);
      draw(world);
    }, 1000 / world.fps);

    setInterval(function() {
      world.remainingTime--;
      $('#time').html('' + world.remainingTime + '');
    }, 1000);

    setTimeout(function() {
      world.remainingTime--;
      window.alert('Congratulations, your score is: ' + world.hits);
      window.location.reload();
    }, world.remainingTime * 1000);

    setInterval(function() {
      //console.log(player.bullets);
      //console.log(enemies);
    }, 1000);
  };


});
// http://www.html5rocks.com/en/tutorials/canvas/notearsgame/
