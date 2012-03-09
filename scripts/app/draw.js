"use strict";
define([],

function() {

  var draw = function(world, player, enemies) {
    world.canvas.clearRect(0, 0, world.canvas_width, world.canvas_height);
    player.draw();
    /*
    enemies.forEach(function(enemy) {
      enemy.draw();
    }); */
  }
  return draw;

});
