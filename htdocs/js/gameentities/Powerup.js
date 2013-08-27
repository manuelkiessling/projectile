"use strict";
define([],

function() {

  var Powerup = function(options) {
    this.active = true;
    this.x = options.x;
    this.y = options.y;
    this.speed = options.speed;
  };

  Powerup.prototype.handleCollidedWithPlayer = function() {
    this.active = false;
  };

  Powerup.prototype.update = function() {
    this.y = this.y + 1;
  };

  return Powerup;

});
