"use strict";
define(['/base/htdocs/js/gameentities/Enemy.js'], function(Enemy) {

  describe('Enemy', function() {
 
    function createEnemy() {
      var MockExplosion = function() {};
      var mockWorld = {
        width: 100,
        height: 100,
        explosions: [],
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
  
  });

});
