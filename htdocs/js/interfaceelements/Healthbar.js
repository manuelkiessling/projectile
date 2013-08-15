"use strict";
define([],
    
function() {

  var healthbar;

  var Healthbar = function(barElement, maxbarElement, maxHealth) {
    this._barElement = barElement;
    this._maxbarElement = maxbarElement;

    this._barElement.css('width', maxHealth * 2.0 + "px");
    this._maxbarElement.css('width', maxHealth * 2.0 + "px");
  };

  Healthbar.prototype.updateHealth = function(damageAmount, currentHealth) {
    healthbar._barElement.css('width', currentHealth * 2.0 + "px");
  };

  Healthbar.prototype.getHasTakenDamageSubscriber = function() {
    healthbar = this;
    return this.updateHealth;
  };

  return Healthbar;

});
