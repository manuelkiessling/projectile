"use strict";
define([],

function() {

  var draw = function(world, player, enemies, bullets) {
    world.canvas.clearRect(0, 0, world.canvas_width, world.canvas_height);
    player.draw();
    /*
    enemies.forEach(function(enemy) {
      enemy.draw();
    }); */

    bullets.forEach(function(bullet) {
      bullet.draw();
    });
  }
  return draw;

});
