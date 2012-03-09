"use strict";
define([],

function() {

  var update = function(world, player, enemies) {
    player.update();
    /*
    enemies.forEach(function(enemy) {
      enemy.draw();
    }); */
  }
  return update;

});
