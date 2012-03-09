"use strict";
define(['../lib/keystatus',
        '../lib/util'
       ],

function(keystatus, util) {

  var Player = function(world, Bullet) {
    this.world = world;
    this.Bullet = Bullet;
    this.width = 16;
    this.height = 30;
    this.x = (this.world.width / 2) + (this.width / 2);
    this.y = this.world.height - this.height;
    this.speed = 5;
    this.bullets = [];
  };

  Player.prototype.update = function() {
    if (keystatus.keydown.left) {
      this.x -= this.speed;
    }
    if (keystatus.keydown.right) {
      this.x += this.speed;
    }
    if (keystatus.keydown.space) {
      this.shoot();
    }

    this.x = util.clamp(this.x, 0, this.world.width - this.width);

    this.bullets.forEach(function(bullet) {
      bullet.update();
    });

    this.bullets = this.bullets.filter(function(bullet) {
      return bullet.active;
    });
  }

  Player.prototype.draw = function() {
    this.bullets.forEach(function(bullet) {
      bullet.draw();
    });

    this.world.drawSprite('player', this.x, this.y, this.width, this.height);
  }

  Player.prototype.midpoint = function() {
    return {
      x: this.x + this.width/2,
      y: this.y + this.height/2
    }
  }

  Player.prototype.shoot = function() {
    this.bullets.push(
      new this.Bullet(this.world, {
        color: '#090',
        x: this.midpoint().x,
        y: this.midpoint().y - (this.height / 2) - 2,
        width: 2,
        height: 2,
        direction: 'up'
      }
    ));
  }

  Player.prototype.explode = function() {
    //
  };

  return Player;

});
