"use strict";
define([],

function() {

  var Tile = function(world, options) {
    this.world = world;
    this.color = options.color || '#000';
    this.imageData = options.imageData || null;
    this.x = options.x;
    this.y = options.y;
    this.width = options.width || 32;
    this.height = options.height || 32;
    this.speed = options.speed || 1;
    this.xVelocity = 0;
    this.yVelocity = this.speed;
    this.active = true;
  };

  Tile.prototype.update = function() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    this.active = this.active && this.inBounds();
  };

  Tile.prototype.draw = function() {
    if (this.imageData) {
      this.world.canvas.putImageData(this.imageData, this.x, this.y);
    } else {
      this.world.drawRectangle(this.color, this.x, this.y, this.width, this.height);
    }
  };

  Tile.prototype.inBounds = function() {
    return this.x >= 0 && this.x <= this.world.width &&
           this.y <= this.world.height;
  };

  return Tile;

});
