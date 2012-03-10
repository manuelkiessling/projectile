"use strict";
define([],

function() {

  var draw = function(world) {
    world.canvas.clearRect(0, 0, world.width, world.height);

    world.tiles.forEach(function(tile) {
      tile.draw();
    });

    world.enemies.forEach(function(enemy) {
      enemy.draw();
    });

    world.bullets.forEach(function(bullet) {
      bullet.draw();
    });

    world.players.forEach(function(player) {
      player.draw();
    });
  }
  return draw;

});
