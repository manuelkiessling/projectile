"use strict";
define(['../lib/keystatus',
        '../lib/util'
       ],

function(keystatus, util) {

  var Player = function(world, Bullet) {
    this.world = world;
    this.Bullet = Bullet;
    this.x = 220;
    this.y = 270;
    this.width = 16;
    this.height = 30;
    this.bullets = [];
  };

  Player.prototype.update = function() {
    if (keystatus.keydown.left) {
      this.x -= 5;
    }
    if (keystatus.keydown.right) {
      this.x += 5;
    }
    if (keystatus.keydown.space) {
      this.shoot();
    }

    this.x = util.clamp(this.x, 0, this.world.canvas_width - this.width);
  }

  Player.prototype.draw = function() {
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
      new this.Bullet(this.world, this.midpoint().x, this.midpoint().y)
    );
  }

  return Player;

});
