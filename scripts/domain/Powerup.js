"use strict";
define([],

function() {

  var PowerupItem = function(world, options) {
    this.world = world;
    this.type = options.type;
    this.x = options.x;
    this.y = options.y;
    this.active = true;

    if (this.type == 'shield') {
      this.width = 100;
      this.height = 100;
      this.xVelocity = 0;
      this.yVelocity = 0.5;
    }
  };

  PowerupItem.prototype.update = function() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    this.active = this.active && this.inBounds();
  };

  PowerupItem.prototype.draw = function() {
    this.world.drawSprite(this.sprite, this.x, this.y, this.width, this.height);
  }

  PowerupItem.prototype.take = function() {
    this.active = false;
  }

  PowerupItem.prototype.inBounds = function() {
    return this.x >= 0 && this.x <= this.world.width &&
           this.y <= this.world.height;
  };

  return PowerupItem;

});
