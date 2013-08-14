"use strict";
define([],

function() {

  var collider = function(game, handlePlayerIsHit, handleEnemyIsHit) {
    game.world.bullets.forEach(function(bullet) {
      game.world.bullets.forEach(function(otherBullet) {
        if (collides(bullet, otherBullet)) {
          bullet.explode('bullet');
          otherBullet.explode('bullet');
        }
      });
      game.world.enemies.forEach(function(enemy) {
        if (collides(bullet, enemy)) {
          enemy.explode();
          bullet.explode('enemy');
          handleEnemyIsHit();
        }
      });
      game.world.players.forEach(function(player) {
        if (collides(bullet, player)) {
          handlePlayerIsHit();
          player.handleHitByBullet(1.0);
          bullet.explode('player');
        }
      });
    });

    game.world.enemies.forEach(function(enemy) {
      game.world.players.forEach(function(player) {
        if (collides(enemy, player)) {
          enemy.explode();
        }
      });
    });
  }

  return collider;
});

var collides = function(source, target) {
  var lethal = false;
  if (source.hasOwnProperty('owner') && target.hasOwnProperty('type')) {   // owned objects are, e.g., bullets
    lethal = (source.owner == 'player' && target.type == 'enemy') ||
             (source.owner == 'enemy' && target.type == 'player');
  } else {
    lethal = true;
  }

  if (source.hasOwnProperty('owner') && target.hasOwnProperty('owner') &&
      source.owner == target.owner) {
    lethal = false;                                              // bullets from same owner don't collide
  }

  return source.hitbox.x < target.hitbox.x      + target.hitbox.width  &&
         source.hitbox.x + source.hitbox.width  > target.hitbox.x      &&
         source.hitbox.y < target.hitbox.y      + target.hitbox.height &&
         source.hitbox.y + source.hitbox.height > target.hitbox.y      &&
         lethal;
};
