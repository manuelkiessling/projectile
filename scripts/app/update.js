"use strict";
define([],

function() {

  var update = function(world, Enemy) {
    world.player.update();

    world.enemies.forEach(function(enemy) {
      enemy.update();
    });

    world.enemies = world.enemies.filter(function(enemy) {
      return enemy.active;
    });

    if(Math.random() < 0.05) {
      world.enemies.push(new Enemy(world));
    }
  }
  return update;

});
