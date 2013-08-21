"use strict";
define([],
    
function() {

  var Healthbar = function(barElement, maxbarElement, maxHealth) {
    this._barElement = barElement;
    this._maxbarElement = maxbarElement;

    this._barElement.css('width', maxHealth * 2.0 + "px");
    this._maxbarElement.css('width', maxHealth * 2.0 + "px");
  };

  Healthbar.prototype.updateHealth = function(damageAmount, currentHealth) {
    this._barElement.css('width', currentHealth * 2.0 + "px");
  };

  Healthbar.prototype.getHasTakenDamageSubscriber = function() {
    var healthbar = this;
    return function(eventInfo) {
      healthbar.updateHealth(eventInfo.damageAmount, eventInfo.currentHealth);
    }
  };

  return Healthbar;

});
