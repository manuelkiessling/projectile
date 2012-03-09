"use strict";
define(['../lib/util'],

function(util) {

  var Enemy = function(world) {
    this.world = world;
    this.width = 32;
    this.height = 32;
    this.xVelocity = 0;
    this.yVelocity =  2 + (Math.random() * 2);
    this.range = 40 + Math.round(Math.random() * 40);
    this.x = Math.random() * (world.width - this.range);
    this.y = -this.height;
    this.active = true;
    this.age = Math.random() * 360;
  };

  Enemy.prototype.update = function() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    this.xVelocity = (0.5 + (Math.random() * 4)) * Math.sin((this.age) * Math.PI / this.range);
    this.x = util.clamp(this.x, 0, this.world.width - this.width);
    this.age++;

    this.active = this.active && this.inBounds();
  };

  Enemy.prototype.draw = function() {
    this.world.drawSprite('enemy', this.x, this.y, this.width, this.height);
  };

  Enemy.prototype.inBounds = function() {
    return this.x >= (-this.width) && this.x <= this.world.width + this.width &&
           this.y >= (-this.height) && this.y <= this.world.height + this.height;
  };

  Enemy.prototype.explode = function() {
    this.active = false;
    console.log('I exploded...');
  };

  return Enemy;

});
