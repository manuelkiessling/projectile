"use strict";
define([],

function() {

  var SpriteAnimation = function(spriteNamePrefix, numberOfSprites, delay)
  {
    this.spriteNamePrefix = spriteNamePrefix;
    this.numberOfSprites = numberOfSprites;
    this.delay = delay;

    this.currentFrame = 0;
    this.drawCounter = 0;
  }

  SpriteAnimation.prototype.draw = function(x, y, drawSprite) {
    if (this.currentFrame >= this.numberOfSprites) {
      this.currentFrame = 0;
    }
    drawSprite(this.spriteNamePrefix + this.currentFrame, x, y);
    if (this.drawCounter === this.delay || this.delay === 0) {
      this.currentFrame++;
      this.drawCounter = 0;
    }
    this.drawCounter++;
  }

  return SpriteAnimation;

});
