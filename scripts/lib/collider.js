"use strict";
define([],

function() {

  var collider = function(game, handlePlayerIsHit, handleEnemyIsKilled) {
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
          handleEnemyIsKilled();
          console.log('Boom!');
        }
      });
      game.world.players.forEach(function(player) {
        if (collides(bullet, player)) {
          handlePlayerIsHit();
          player.explode();
          bullet.explode('player');
        }
      });
    });

    game.world.enemies.forEach(function(enemy) {
      game.world.players.forEach(function(player) {
        if (collides(enemy, player)) {
          enemy.explode();
          player.explode();
        }
      });
    });
  }

  return collider;
});

var collides = function(a, b) {
  var lethal = false;
  if (a.hasOwnProperty('owner') && b.hasOwnProperty('type')) {   // owned objects are, e.g., bullets
    lethal = (a.owner == 'player' && b.type == 'enemy') ||
             (a.owner == 'enemy' && b.type == 'player');
  } else {
    lethal = true;
  }

  if (a.hasOwnProperty('owner') && b.hasOwnProperty('owner') &&
      a.owner == b.owner) {
    lethal = false;                                              // bullets from same owner don't collide
  }

  return a.hitbox.x < b.hitbox.x      + b.hitbox.width  &&
         a.hitbox.x + a.hitbox.width  > b.hitbox.x      &&
         a.hitbox.y < b.hitbox.y      + b.hitbox.height &&
         a.hitbox.y + a.hitbox.height > b.hitbox.y      &&
         lethal;
};
