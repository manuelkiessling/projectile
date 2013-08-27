"use strict";
define(['/base/htdocs/js/gameentities/Powerup.js'], function(Powerup) {

  describe('Powerup', function() {
 
    function createPowerup() {
      return new Powerup({
        x: 0,
        y: 0,
        speed: 1,
      });
    }

    it('should be set inactive when colliding with the player', function() {
      var powerup = createPowerup();
      expect(powerup.active).toBe(true);
      powerup.handleCollidedWithPlayer();
      expect(powerup.active).toBe(false);
    });

    it('should move down one speed-unit on each update cycle', function() {
      var powerup = createPowerup();
      expect(powerup.y).toBe(0);
      powerup.update();
      expect(powerup.y).toBe(1);
      powerup.update();
      expect(powerup.y).toBe(2);
      powerup.update();
      expect(powerup.y).toBe(3);
    });
    
    it('should return the correct hitbox info', function() {
      var powerup = createPowerup();
      var hitbox = powerup.hitbox();
      expect([hitbox.x, hitbox.y, hitbox.width, hitbox.height]).toEqual([0, 0, 10, 10]);
      powerup.update();
      hitbox = powerup.hitbox();
      expect([hitbox.x, hitbox.y, hitbox.width, hitbox.height]).toEqual([0, 1, 10, 10]);
    });

  });

});
