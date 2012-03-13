"use strict";
define([],

function() {

  var update = function(world, Enemy, Bullet, Explosion) {
    world.terrainBuilder.update();

    [world.tiles,
     world.enemies,
     world.bullets,
     world.explosions,
     world.players
    ].forEach(
      function(gameElementArray) {
        gameElementArray.forEach(function(gameElement) {
          gameElement.update();
        });
      }
    );

    world.enemies = world.enemies.filter(function(enemy) {
      return enemy.active;
    });

    world.bullets = world.bullets.filter(function(bullet) {
      return bullet.active;
    });

    world.explosions = world.explosions.filter(function(explosion) {
      return explosion.active;
    });

    world.tiles = world.tiles.filter(function(tile) {
      return tile.active;
    });

    if(Math.random() < 0.02) {
      if (Math.random() < 0.5) {
        world.enemies.push(new Enemy(world, Bullet, Explosion, { spriteName: 'enemy' }));
      } else {
        world.enemies.push(new Enemy(world, Bullet, Explosion, { spriteName: 'enemy_turquoise' }));
      }
    }
  }
  return update;

});
