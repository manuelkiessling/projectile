"use strict";
define([],

function() {

  var Bullet = function(world, x, y, direction, speed) {
    this.world = world;
    this.color = '#F00';
    this.x = x;
    this.y = y;
    this.width = 1;
    this.height = 1;
    this.speed = speed || 4;

    this.xVelocity = 0;

    if (direction === 'up') {
      this.yVelocity = -this.speed;
    } else if (direction === 'down') {
      this.yVelocity = this.speed;
    }

    this.active = true;
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
