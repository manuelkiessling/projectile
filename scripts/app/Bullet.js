"use strict";
define([],

function() {

  var Bullet = function(world, options) {
    this.world = world;
    this.color = options.color || '#F00';
    this.x = options.x;
    this.y = options.y;
    this.width = options.width || 1;
    this.height = options.height || 1;
    this.speed = options.speed || 4;

    this.xVelocity = 0;

    if (options.direction === 'up') {
      this.yVelocity = -this.speed;
    } else {
      this.yVelocity = this.speed;
    }

    this.active = true;
    this.owner = options.owner;
  };

  Bullet.prototype.update = function() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    this.active = this.active && this.inBounds();
  };

  Bullet.prototype.draw = function() {
    this.world.drawRectangle(this.color, this.x, this.y, this.width, this.height);
  };

  Bullet.prototype.inBounds = function() {
    return this.x >= 0 && this.x <= this.world.width &&
           this.y >= 0 && this.y <= this.world.height;
  };

  Bullet.prototype.explode = function() {
    this.active = false;
  };

  return Bullet;

});
