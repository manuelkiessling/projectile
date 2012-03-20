"use strict";
define([],

function() {

  var update = function(game, Enemy, Bullet, Explosion) {
    game.terrainBuilder.update();

    [game.world.tiles,
     game.world.enemies,
     game.world.bullets,
     game.world.explosions,
     game.world.players
    ].forEach(
      function(gameElementArray) {
        gameElementArray.forEach(function(gameElement) {
          gameElement.update();
        });
      }
    );

    game.world.enemies = game.world.enemies.filter(function(enemy) {
      return enemy.active;
    });

    game.world.bullets = game.world.bullets.filter(function(bullet) {
      return bullet.active;
    });

    game.world.explosions = game.world.explosions.filter(function(explosion) {
      return explosion.active;
    });

    game.world.tiles = game.world.tiles.filter(function(tile) {
      return tile.active;
    });

    if(Math.random() < 0.02) {
      if (Math.random() < 0.1) {
        game.world.enemies.push(new Enemy(game.world, Bullet, Explosion, { spriteName: 'enemy2' }));
      } else {
        if (Math.random() < 0.8) {
          game.world.enemies.push(new Enemy(game.world, Bullet, Explosion, { spriteName: 'enemy' }));
        } else {
          game.world.enemies.push(new Enemy(game.world, Bullet, Explosion, { spriteName: 'enemy_turquoise' }));
        }
      }
    }
  }
  return update;

});
