"use strict";
define(['../lib/util'],

function(util) {

  var Enemy = function(world, Bullet) {
    this.world = world;
    this.Bullet = Bullet;
    this.width = 256;
    this.height = 256;
    this.xVelocity = 0;
    this.yVelocity =  2 + (Math.random() * 2);
    this.range = 40 + Math.round(Math.random() * 40);
    this.x = Math.random() * (world.width - this.range);
    this.y = -this.height;
    this.active = true;
    this.age = Math.random() * 360;
    this.type = 'enemy';

    this.hitboxMetrics = {
      x: 2,
      y: 5,
      width: 55,
      height: 59
    };

    this.hitbox = {
      x: this.x + this.hitboxMetrics.x,
      y: this.y + this.hitboxMetrics.y,
      width: this.hitboxMetrics.width,
      height: this.hitboxMetrics.height
    };
  };

  Enemy.prototype.update = function() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    this.xVelocity = (0.5 + (Math.random() * 4)) * Math.sin((this.age) * Math.PI / this.range);
    this.x = util.clamp(this.x, -this.hitboxMetrics.x, (this.world.width - this.hitboxMetrics.width - this.hitboxMetrics.x));

    this.updateHitbox();
    this.age++;

    this.active = this.active && this.inBounds();

    if (Math.random() < 0.003) {
      this.shoot();
    }
  };

  Enemy.prototype.draw = function() {
    this.world.drawSprite('enemy', this.x, this.y, this.width, this.height);
  };

  Enemy.prototype.inBounds = function() {
    return this.x >= (-this.width) && this.x <= this.world.width + this.width &&
           this.y >= (-this.height) && this.y <= this.world.height + this.height;
  };

  Enemy.prototype.midpoint = function() {
    return {
      x: (this.x + this.width/2) - 100, // Spaceship is in upper left corner
      y: (this.y + this.height/2) - 97
    }
  }

  Enemy.prototype.updateHitbox = function() {
    this.hitbox = {
      x: this.x + this.hitboxMetrics.x,
      y: this.y + this.hitboxMetrics.y,
      width: this.hitboxMetrics.width,
      height: this.hitboxMetrics.height
    };
  };

  Enemy.prototype.shoot = function() {
    this.world.bullets.push(
      new this.Bullet(this.world, {
        color: '#C00',
        x: this.midpoint().x,
        y: this.midpoint().y - (this.height / 2) + 30, // Shoot from bottom of ship
        width: 5,
        height: 5,
        direction: 'down',
        speed: this.yVelocity + 10,
        owner: this.type
      })
    );
  };

  Enemy.prototype.explode = function() {
    this.active = false;
    console.log('I exploded...');
  };

  return Enemy;

});
