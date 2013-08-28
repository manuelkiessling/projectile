"use strict";
define([],

function() {

  var Entity = function() {
    this._eventSubscribers = Array();
  };

  Entity.prototype.on = function(eventType, subscriber) {
    if (Object.prototype.toString.call(this._eventSubscribers[eventType]) !== '[object Array]') {
      this._eventSubscribers[eventType] = Array();
    }
    this._eventSubscribers[eventType].push(subscriber);
  };

  Entity.prototype._publishEvent = function(eventType, eventInfo) {
    if (this._eventSubscribers[eventType] !== undefined) {
      this._eventSubscribers[eventType].forEach(function(subscriber) {
        subscriber(eventInfo);
      });
    }
  };

  Entity.prototype.hitbox = function() {
    return {
      x: this.x + this.hitboxMetrics.x,
      y: this.y + this.hitboxMetrics.y,
      width: this.hitboxMetrics.width,
      height: this.hitboxMetrics.height
    };
  };

  return Entity;

});
