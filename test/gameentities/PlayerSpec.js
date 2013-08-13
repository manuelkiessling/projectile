"use strict";
define(['/base/htdocs/js/gameentities/Player.js'], function(Player) {

  describe("Player", function() {
  
    it("can be created", function() {
      var mockWorld = {
        width: 100,
        height: 100,
      };
      var mockOptions = {
        keyleft: undefined,
        keyright: undefined,
        keyup: undefined,
        keydown: undefined,
        keyfire: undefined,
      };
      var player = new Player(mockWorld, undefined, undefined, mockOptions);
    });

  });

});
