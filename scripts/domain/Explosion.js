"use strict";
define(['../lib/SpriteAnimation'],

function(SpriteAnimation) {

  var Explosion = function(world, options) {
    this.world = world;
    this.animation = new SpriteAnimation('explosion/explosion-', 17, 1);
    this.x = options.x;
    this.y = options.y;
    this.width = options.width || 71;
    this.height = options.height || 100;
    this.loops = 0;
    this.active = true;
  };

  Explosion.prototype.update = function() {
    this.active = (this.loops < 17);
    this.loops++;
  };

  Explosion.prototype.draw = function() {
    var that = this;
    this.animation.draw(this.x, this.y, function(spriteName, x, y) {
      that.world.drawSprite(spriteName, x, y, that.width, that.height);
    });
  };

  Explosion.prototype.explode = function() {
    this.active = false;
  };

  Explosion.prototype.updateHitbox = function() {
    this.hitbox = {
      x: this.x + this.hitboxMetrics.x,
      y: this.y + this.hitboxMetrics.y,
      width: this.hitboxMetrics.width,
      height: this.hitboxMetrics.height
    };
  };

  return Explosion;

});
