"use strict";
define(['../lib/util'],

function(util) {

  var Enemy = function(world, Bullet) {
    this.world = world;
    this.Bullet = Bullet;
    this.width = 32;
    this.height = 32;
    this.xVelocity = 0;
    this.yVelocity =  2 + (Math.random() * 2);
    this.range = 40 + Math.round(Math.random() * 40);
    this.x = Math.random() * (world.width - this.range);
    this.y = -this.height;
    this.active = true;
    this.age = Math.random() * 360;
    this.bullets = [];
  };

  Enemy.prototype.update = function() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    this.xVelocity = (0.5 + (Math.random() * 4)) * Math.sin((this.age) * Math.PI / this.range);
    this.x = util.clamp(this.x, 0, this.world.width - this.width);
    this.age++;

    this.active = this.active && this.inBounds();

    if (Math.random() < 0.04) {
      this.shoot();
    }

    this.bullets.forEach(function(bullet) {
      bullet.update();
    });

    this.bullets = this.bullets.filter(function(bullet) {
      return bullet.active;
    });
  };

  Enemy.prototype.draw = function() {
    this.bullets.forEach(function(bullet) {
      bullet.draw();
    });
    
    this.world.drawSprite('enemy', this.x, this.y, this.width, this.height);
  };

  Enemy.prototype.inBounds = function() {
    return this.x >= (-this.width) && this.x <= this.world.width + this.width &&
           this.y >= (-this.height) && this.y <= this.world.height + this.height;
  };

  Enemy.prototype.midpoint = function() {
    return {
      x: this.x + this.width/2,
      y: this.y + this.height/2
    }
  }

  Enemy.prototype.shoot = function() {
    this.bullets.push(
      new this.Bullet(this.world, this.midpoint().x, this.midpoint().y - (this.height / 2) - 2, 'down', 6)
    );
  };

  Enemy.prototype.explode = function() {
    this.active = false;
    console.log('I exploded...');
  };

  return Enemy;

});
