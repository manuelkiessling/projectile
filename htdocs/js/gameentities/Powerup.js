"use strict";
define([],

function() {

  var Powerup = function(options) {
    this.active = true;
    this.x = options.x;
    this.y = options.y;
    this.width = 10;
    this.height = 10;
    this.speed = options.speed;
  };

  Powerup.prototype.hitbox = function() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  };

  Powerup.prototype.handleCollidedWithPlayer = function() {
    this.active = false;
  };

  Powerup.prototype.update = function() {
    this.y = this.y + 1;
  };

  return Powerup;

});
