"use strict";
define(['lib/SpriteLoader'],

function(SpriteLoader) {

  var loadSprites = function(callback) {
    var sprites = {};

    var spriteNames = ['enemy', 'enemy_turquoise', 'enemy2', 'player', 'playerBullet', 'enemyBullet'];
    for (var i=0; i < 17; i++) {
      spriteNames.push('explosion/explosion-' + i);
    }

    var spriteLoader = new SpriteLoader();
    spriteLoader.load('assets/images', spriteNames, '.png', function(loadedSprites) {
      for (var spriteName in loadedSprites) {
        sprites[spriteName] = loadedSprites[spriteName];
      }
      spriteNames = ['terrain_mars1', 'terrain_mars2'];

      spriteLoader.load('assets/images', spriteNames, '.jpg', function(loadedSprites) {
        for (var spriteName in loadedSprites) {
          sprites[spriteName] = loadedSprites[spriteName];
        }
        callback(sprites);
      });

    });
  };

  return loadSprites;

});
