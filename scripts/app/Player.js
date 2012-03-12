"use strict";
define(['../lib/keystatus',
        '../lib/util'
       ],

function(keystatus, util) {

  var Player = function(world, Bullet, Explosion, options) {
    this.world = world;
    this.Bullet = Bullet;
    this.Explosion = Explosion;
    this.width = 256;
    this.height = 256;
    this.x = (this.world.width / 2) + (this.width / 2);
    this.y = this.world.height - this.height;
    this.speed = 5;
    this.type = 'player';
    this.shootLock = false;

    this.hitboxMetrics = {
      x: 32,
      y: 28,
      width: 73,
      height: 120
    };

    this.hitbox = {
      x: this.x + this.hitboxMetrics.x,
      y: this.y + this.hitboxMetrics.y,
      width: this.hitboxMetrics.width,
      height: this.hitboxMetrics.height
    };

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

    this.x = util.clamp(this.x, -this.hitboxMetrics.x, (this.world.width - this.hitboxMetrics.width - this.hitboxMetrics.x));
    this.y = util.clamp(this.y, -this.hitboxMetrics.y, (this.world.height - this.hitboxMetrics.height - this.hitboxMetrics.y));

    this.updateHitbox();
  }

  Player.prototype.draw = function() {
    this.world.drawSprite('player', this.x, this.y, this.width, this.height);
  }

  Player.prototype.midpoint = function() {
    return {
      x: (this.hitbox.x + this.hitbox.width/2),
      y: (this.hitbox.y + this.hitbox.height/2)
    }
  }

  Player.prototype.updateHitbox = function() {
    this.hitbox = {
      x: this.x + this.hitboxMetrics.x,
      y: this.y + this.hitboxMetrics.y,
      width: this.hitboxMetrics.width,
      height: this.hitboxMetrics.height
    };
  };

  Player.prototype.shoot = function() {
    this.world.bullets.push(
      new this.Bullet(this.world, this.Explosion, {
        x: this.midpoint().x - 5, // Correction: half of missile width
        y: this.midpoint().y - this.hitbox.height/2, // Shoot from top of ship
        width: 141,
        height: 133,
        hitboxMetrics: {
          x: 20,
          y: 11,
          width: 13,
          height: 42
        },
        direction: 'up',
        speed: 0.01,
        acceleration: 0.9,
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
