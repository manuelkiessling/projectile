"use strict";
define([],

function() {

  var update = function(world, player, enemies, bullets) {
    player.update();
    /*
    enemies.forEach(function(enemy) {
      enemy.draw();
    }); */

    bullets.forEach(function(bullet) {
      bullet.update();
    });
  }
  return update;

});
