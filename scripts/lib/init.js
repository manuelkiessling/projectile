"use strict";
define(['../lib/SpriteLoader'],

function(SpriteLoader) {

  var init = function(callback) {

    var spriteNames = ['terrain_mars1', 'terrain_mars2', 'enemy', 'enemy_turquoise', 'enemy2', 'player2', 'playerBullet', 'enemyBullet'];
    for (var i=0; i < 17; i++) {
      spriteNames.push('explosion/explosion-' + i);
    }

    var spriteLoader = new SpriteLoader();
    spriteLoader.load('assets/images', spriteNames, '.png', function(loadedSprites) {
      callback(loadedSprites);
    });
  };



});
