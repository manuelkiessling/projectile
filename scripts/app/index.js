"use strict";
define(['jquery',
        'update',
        'draw',
        'collider',
        'Player',
        'Enemy',
        'Bullet',
        'TerrainBuilder',
        'Tile'
       ],

function($, update, draw, collider, Player, Enemy, Bullet, TerrainBuilder, Tile) {

  var sprites = {};
  var spriteCounter = 0;

  var spriteNames = ['enemy', 'player', 'playerBullet', 'terrain_grass', 'terrain_yellowtrees', 'terrain_greentrees'];
  spriteNames.forEach(function(spriteFile) {
    var img = new Image();
    img.onload = function() {
      spriteCounter++;
      sprites[spriteFile] = img;
      if (spriteCounter === spriteNames.length) {
        start();
      }
    };
    img.src = 'assets/images/' + spriteFile + '.png';
  });

  var start = function() {
      var World = function() {
      this.sprites = sprites;
    };

    World.prototype.drawSprite = function(spriteName, x, y, width, height) {
      if (this.sprites[spriteName]) {
        this.canvas.drawImage(this.sprites[spriteName], x, y, width, height);
      }
    };

    World.prototype.drawRectangle = function(color, x, y, width, height) {
      this.canvas.fillStyle = color;
      this.canvas.fillRect(x, y, width, height);
    };


    var world = new World();

    world.canvas = document.getElementById('world').getContext('2d');
    world.width = 800;
    world.height = 800;
    world.fps = 40;
    world.terrainSpeed = 0.5;
    world.players = [];
    world.enemies = [];
    world.bullets = [];
    world.tiles = [];

    world.players.push(new Player(world, Bullet, {
      keyleft: 'left',
      keyright: 'right',
      keyup: 'up',
      keydown: 'down',
      keyfire: 'space'
    }));

    world.players.push(new Player(world, Bullet, {
      keyleft: 'a',
      keyright: 'd',
      keyup: 'w',
      keydown: 's',
      keyfire: 'q'
    }));

    world.terrainBuilder = new TerrainBuilder(world, Tile);

    // Game loop
    setInterval(function() {
      collider(world);
      update(world, Enemy, Bullet);
      draw(world);
    }, 1000/world.fps);

    setInterval(function() {
      //console.log(player.bullets);
      //console.log(enemies);
    }, 1000);
  };



});
// http://www.html5rocks.com/en/tutorials/canvas/notearsgame/
