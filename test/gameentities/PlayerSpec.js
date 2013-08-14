"use strict";
define(['/base/htdocs/js/gameentities/Player.js'], function(Player) {

  describe("Player", function() {

    function createPlayer() {
      var mockWorld = {
        width: 100,
        height: 100,
      };
      var mockOptions = {
        health: 100.0,
        keyleft: undefined,
        keyright: undefined,
        keyup: undefined,
        keydown: undefined,
        keyfire: undefined,
      };
      return new Player(mockWorld, undefined, undefined, mockOptions);
    }

    it("should loose the damage amount when hit by a bullet as health", function() {
      var player = createPlayer();
      player.handleHitByBullet(1.0);
      expect(player.health()).toEqual(99.0);
    });

    it("should inform subscribers to the hasTakenDamage event upon being hit by a bullet", function() {
      var player = createPlayer();
      var hasInformedMe = false;

      player.on('hasTakenDamage', function(damageAmount, currentHealth) {
        if (damageAmount == 1.0 && currentHealth == 99.0) {
          hasInformedMe = true;
        }
      });

      player.handleHitByBullet(1.0);

      expect(hasInformedMe).toBe(true);
    });

  });

});
