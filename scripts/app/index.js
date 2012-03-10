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

  var world;
  var sprites = {};

  world = {
    canvas: document.getElementById('world').getContext('2d'),
    width: 800,
    height: 300,
    fps: 30,
    ticks: 0,
    players: [],
    enemies: [],
    bullets: [],
    tiles: []
  };

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

  world.drawSprite = function(spriteName, x, y, width, height) {
    if (!sprites[spriteName]) {
      var img = new Image();
      img.onload = function() {
        sprites[spriteName] = img;
      };
      img.src = 'assets/images/' + spriteName + '.png';
    }
    if (sprites[spriteName]) {
      this.canvas.drawImage(sprites[spriteName], x, y, width, height);
    }
  };

  world.drawRectangle = function(color, x, y, width, height) {
    this.canvas.fillStyle = color;
    this.canvas.fillRect(x, y, width, height);
  };

  world.terrainBuilder = new TerrainBuilder(world, Tile);

  // Game loop
  setInterval(function() {
    collider(world);
    update(world, Enemy, Bullet);
    draw(world);
    world.ticks++;
  }, 1000/world.fps);

  setInterval(function() {
    //console.log(player.bullets);
    //console.log(enemies);
  }, 1000);


  //enemies.push(new Enemy(world));

});
// http://www.html5rocks.com/en/tutorials/canvas/notearsgame/
