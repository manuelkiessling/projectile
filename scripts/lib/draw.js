"use strict";
define([],

function() {

  var draw = function(world) {
    world.canvas.clearRect(0, 0, world.width, world.height);

    [world.tiles,
     world.enemies,
     world.bullets,
     world.explosions,
     world.players
    ].forEach(
      function(gameElementArray) {
        gameElementArray.forEach(function(gameElement) {
          gameElement.draw();
        });
      }
    );
  }
  return draw;

});
