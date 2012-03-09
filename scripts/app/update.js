"use strict";
define([],

function() {

  var update = function(world, Enemy, Bullet) {
    world.player.update();

    world.enemies.forEach(function(enemy) {
      enemy.update();
    });

    world.bullets.forEach(function(bullet) {
      bullet.update();
    });

    world.enemies = world.enemies.filter(function(enemy) {
      return enemy.active;
    });

    world.bullets = world.bullets.filter(function(bullet) {
      return bullet.active;
    });

    if(Math.random() < 0.05) {
      world.enemies.push(new Enemy(world, Bullet));
    }
  }
  return update;

});
