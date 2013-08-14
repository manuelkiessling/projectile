"use strict";
define([],
    
function() {

  var healthbar;

  var Healthbar = function(valueElement) {
    this._valueElement = valueElement;
  };

  Healthbar.prototype.updateHealth = function(damageAmount, currentHealth) {
    healthbar._valueElement.text(currentHealth);
  };

  Healthbar.prototype.getHasTakenDamageSubscriber = function() {
    healthbar = this;
    return this.updateHealth;
  };

  return Healthbar;

});
