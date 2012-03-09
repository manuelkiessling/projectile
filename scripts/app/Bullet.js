"use strict";
define([],

function() {

  var Bullet = function(world, x, y) {
    this.world = world;
    this.color = '#00A';
    this.x = x;
    this.y = y;
    this.width = 1;
    this.height = 2;
    this.speed = 4;
    this.xVelocity = 0;
    this.yVelocity = -this.speed;
  };

  Bullet.prototype.update = function() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }

  Bullet.prototype.draw = function() {
    this.world.drawRectangle(this.color, this.x, this.y, this.width, this.height);
  }

  return Bullet;

});
