"use strict";
define([],

function() {

  var collider = function(world) {
    world.player.bullets.forEach(function(bullet) {
      world.enemies.forEach(function(enemy) {
        if (collides(bullet, enemy)) {
          enemy.explode();
          bullet.explode();
          console.log('Boom!');
        }
      });
    });

    world.enemies.forEach(function(enemy) {
      if (collides(enemy, world.player)) {
        enemy.explode();
        world.player.explode();
      }
    });
  }

  return collider;
});

var collides = function(a, b) {
  return a.x < b.x      + b.width  &&
         a.x + a.width  > b.x      &&
         a.y < b.y      + b.height &&
         a.y + a.height > b.y;
};
