"use strict";
define([],

function() {

  var update = function(world, Enemy, Bullet) {
    world.terrainBuilder.update();

    world.players.forEach(function(player) {
      player.update();
    });

    world.enemies.forEach(function(enemy) {
      enemy.update();
    });

    world.bullets.forEach(function(bullet) {
      bullet.update();
    });

    world.tiles.forEach(function(tile) {
      tile.update();
    });

    world.enemies = world.enemies.filter(function(enemy) {
      return enemy.active;
    });

    world.bullets = world.bullets.filter(function(bullet) {
      return bullet.active;
    });

    world.tiles = world.tiles.filter(function(tile) {
      return tile.active;
    });

    if(Math.random() < 0.01) {
      world.enemies.push(new Enemy(world, Bullet));
    }
  }
  return update;

});
