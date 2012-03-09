"use strict";
define(['jquery',
        'update',
        'draw',
        'Player',
        //'Enemy',
        'Bullet'
       ],

function($, update, draw, Player, Bullet) {

  var world;
  var sprites = {};
  var player;
  var enemies = [];

  world = {
    canvas: document.getElementById('world').getContext('2d'),
    canvas_width: 480,
    canvas_height: 320,
    fps: 60
  };

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

  // Game loop
  setInterval(function() {
    update(world, player, enemies, player.bullets);
    draw(world, player, enemies, player.bullets);
  }, 1000/world.fps);

  player = new Player(world, Bullet);
  //enemies.push(new Enemy(world));

});
// http://www.html5rocks.com/en/tutorials/canvas/notearsgame/
