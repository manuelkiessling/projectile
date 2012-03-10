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
    this.acceleration = options.acceleration || 0;
    this.image = options.image || null;

    this.xVelocity = 0;

    if (options.direction === 'up') {
      this.yVelocity = -this.speed;
    } else {
      this.yVelocity = this.speed;
    }

    this.active = true;
    this.owner = options.owner;

    this.hitboxMetrics = {
      x: 0,
      y: 0,
      width: this.width,
      height: this.height
    };

    this.hitbox = {
      x: this.x + this.hitboxMetrics.x,
      y: this.y + this.hitboxMetrics.y,
      width: this.hitboxMetrics.width,
      height: this.hitboxMetrics.height
    };
  };

  Bullet.prototype.update = function() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    this.updateHitbox();

    if (this.direction === 'up') {
      this.yVelocity = this.yVelocity + this.acceleration;
    } else {
      this.yVelocity = this.yVelocity - this.acceleration;
    }

    this.active = this.active && this.inBounds();

    this.hitbox = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  };

  Bullet.prototype.draw = function() {
    if (this.image === null) {
      this.world.drawRectangle(this.color, this.x, this.y, this.width, this.height);
    } else {
      this.world.drawSprite(this.image, this.x, this.y, this.width, this.height);
    }

  };

  Bullet.prototype.inBounds = function() {
    return this.x >= 0 && this.x <= this.world.width &&
           this.y >= 0 && this.y <= this.world.height;
  };

  Bullet.prototype.explode = function() {
    this.active = false;
  };

  Bullet.prototype.updateHitbox = function() {
    this.hitbox = {
      x: this.x + this.hitboxMetrics.x,
      y: this.y + this.hitboxMetrics.y,
      width: this.hitboxMetrics.width,
      height: this.hitboxMetrics.height
    };
  };

  return Bullet;

});
