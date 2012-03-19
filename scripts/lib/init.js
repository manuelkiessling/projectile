"use strict";
describe([],

function() {

  var loadCounter = 1;
  var interval = setInterval(function() {
    loadCounter++;
    $('#loadbar').css('width', 10 * loadCounter);
  }, 100);

  var spriteNames = ['terrain_mars1', 'terrain_mars2', 'enemy', 'enemy_turquoise', 'enemy2', 'player2', 'playerBullet', 'enemyBullet'];
  for (var i=0; i < 17; i++) {
    spriteNames.push('explosion/explosion-' + i);
  }

  var spriteLoader = new SpriteLoader();
  spriteLoader.load('assets/images', spriteNames, '.png', function(loadedSprites) {
    sprites = loadedSprites;
    clearInterval(interval);
    $('#loadbar').hide();
    $('#loadnote').hide();
    $('#startlink').show();
    $('#startlink').click(function() {
      $('#loadscreen').hide();
      callback();
    });
  });

});
