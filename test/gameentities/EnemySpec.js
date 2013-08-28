"use strict";
define(['/base/htdocs/js/gameentities/Enemy.js'], function(Enemy) {

  describe('Enemy', function() {
 
    function createEnemy() {
      var MockExplosion = function() {};
      var mockWorld = {
        width: 100,
        height: 100,
        explosions: [],
        players: {
          0: {
            hitbox: {
              x: 0,
              y: 0,
              width: 0,
              height: 0,
            },
          },
        },
      };
      return new Enemy(mockWorld, undefined, MockExplosion, {spriteName: undefined});
    }

    it('should die when being hit by a bullet', function() {
      var enemy = createEnemy();
      expect(enemy.active).toBe(true);
      enemy.handleHitByBullet(1.0);
      expect(enemy.active).toBe(false);
    });

    it('should die when colliding with the player', function() {
      var enemy = createEnemy();
      expect(enemy.active).toBe(true);
      enemy.handleCollidedWithPlayer();
      expect(enemy.active).toBe(false);
    });

    it('should always return a correct hitbox', function() {
      var enemy = createEnemy();
      var hitbox = enemy.hitbox();
      expect([hitbox.x, hitbox.y, hitbox.width, hitbox.height]).toEqual([enemy.x+2, enemy.y+5, 55, 59]);
      enemy.update();
      hitbox = enemy.hitbox();
      expect([hitbox.x, hitbox.y, hitbox.width, hitbox.height]).toEqual([enemy.x+2, enemy.y+5, 55, 59]);
    });
  
  });

});
