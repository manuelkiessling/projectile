"use strict";
define([],

function() {

  var Powerup = function() {
    this.active = true;
  };

  Powerup.prototype.handleCollidedWithPlayer = function() {
    this.active = false;
  };

  return Powerup;

});
