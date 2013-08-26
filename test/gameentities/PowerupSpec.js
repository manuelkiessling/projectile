"use strict";
define(['/base/htdocs/js/gameentities/Powerup.js'], function(Powerup) {

  describe('Powerup', function() {
 
    function createPowerup() {
      return new Powerup();
    }

    it('should be set inactive when colliding with the player', function() {
      var powerup = createPowerup();
      expect(powerup.active).toBe(true);
      powerup.handleCollidedWithPlayer();
      expect(powerup.active).toBe(false);
    });

  });

});
