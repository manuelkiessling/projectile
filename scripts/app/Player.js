"use strict";
define(['../lib/keystatus',
        '../lib/util'
       ],

function(keystatus, util) {

  var Player = function(world, Bullet, options) {
    this.world = world;
    this.Bullet = Bullet;
    this.width = 16;
    this.height = 30;
    this.x = (this.world.width / 2) + (this.width / 2);
    this.y = this.world.height - this.height;
    this.speed = 5;
    this.type = 'player';
    this.shootLock = false;

    this.keyleft = options.keyleft || 'left';
    this.keyright = options.keyright || 'right';
    this.keyup = options.keyup || 'up';
    this.keydown = options.keydown || 'down';
    this.keyfire = options.keyfire || 'space';
  };

  Player.prototype.update = function() {
    if (keystatus.keydown[this.keyleft]) {
      this.x -= this.speed;
    }
    if (keystatus.keydown[this.keyright]) {
      this.x += this.speed;
    }
    if (keystatus.keydown[this.keyup]) {
      this.y -= this.speed;
    }
    if (keystatus.keydown[this.keydown]) {
      this.y += this.speed;
    }
    if (keystatus.keydown[this.keyfire]) {
      if (!this.shootLock) {
        this.shoot();
        this.shootLock = true;
        var that = this
        setTimeout(function() {
          that.shootLock = false;
        }, 200);
      }
    }

    this.x = util.clamp(this.x, 0, this.world.width - this.width);
    this.y = util.clamp(this.y, 0, this.world.height - this.height);
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
    this.world.bullets.push(
      new this.Bullet(this.world, {
        color: '#090',
        x: this.midpoint().x,
        y: this.midpoint().y - (this.height / 2) - 2,
        width: 10,
        height: 26,
        direction: 'up',
        acceleration: 0.3,
        owner: this.type,
        image: 'playerBullet'
      }
    ));
  }

  Player.prototype.explode = function() {
    //window.alert('You died!');
  };

  return Player;

});
