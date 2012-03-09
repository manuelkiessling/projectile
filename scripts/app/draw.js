"use strict";
define([],

function() {

  var draw = function(world) {
    world.canvas.clearRect(0, 0, world.width, world.height);

    world.player.draw();

    world.enemies.forEach(function(enemy) {
      enemy.draw();
    });
  }
  return draw;

});
