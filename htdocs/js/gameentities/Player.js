"use strict";
define(['lib/keystatus',
        'lib/util'
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
    this.speed = 7;
    this.type = 'player';
    this.shootLock = false;
    this.lastShotFrom = 'left';

    this._health = options.health || 100.0;

    this.hitboxMetrics = {
      x: 21,
      y: 28,
      width: 87,
      height: 99
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

    this.eventSubscribers = Array();
  };

  Player.prototype.on = function(eventType, subscriber) {
    if (Object.prototype.toString.call(this.eventSubscribers[eventType]) !== '[object Array]') {
      this.eventSubscribers[eventType] = Array();
    }
    this.eventSubscribers[eventType].push(subscriber);
  };

  Player.prototype.health = function() {
    return this._health;
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
        }, 180);
      }
    }

    this.x = util.clamp(this.x, -this.hitboxMetrics.x, (this.world.width - this.hitboxMetrics.width - this.hitboxMetrics.x));
    this.y = util.clamp(this.y, -this.hitboxMetrics.y, (this.world.height - this.hitboxMetrics.height - this.hitboxMetrics.y + 50));

    this.updateHitbox();
  }

  Player.prototype.draw = function() {
    //this.world.drawRectangle("#00ff00", this.x, this.y, this.width, this.height);
    //this.world.drawRectangle("#ffffff", this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
    this.world.drawSprite('player', this.x, this.y, this.width, this.height);
    //this.world.drawRectangle("#000000", this.midpoint().x, this.midpoint().y, 1, 40);
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
    if (this.lastShotFrom == 'left') {
      // Right laser
      this.world.bullets.push(
        new this.Bullet(this.world, this.Explosion, {
          x: this.midpoint().x + 18,
          y: (this.midpoint().y - this.hitbox.height/2) + 20,
          width: 141,
          height: 144,
          hitboxMetrics: {
            x: 18,
            y: 20,
            width: 6,
            height: 30
          },
          direction: 'up',
          speed: 10,
          acceleration: 0.9,
          owner: this.type,
          spriteName: 'playerBullet'
        }
      ));
      this.lastShotFrom = 'right';
    } else {
      // Left laser
      this.world.bullets.push(
        new this.Bullet(this.world, this.Explosion, {
          x: this.midpoint().x - 60,
          y: (this.midpoint().y - this.hitbox.height/2) + 20,
          width: 141,
          height: 144,
          hitboxMetrics: {
            x: 18,
            y: 20,
            width: 6,
            height: 30
          },
          direction: 'up',
          speed: 10,
          acceleration: 0.9,
          owner: this.type,
          spriteName: 'playerBullet'
        }
      ));
      this.lastShotFrom = 'left';
    }
  }

  Player.prototype.handleHitByBullet = function(bulletStrength) {
    this._health = this._health - bulletStrength;
    if (this._health <= 0.0) {
      if (this.eventSubscribers['died'] !== undefined) {
        this.eventSubscribers['died'].forEach(function(subscriber) {
          subscriber();
        });
      }
    }
    if (this.eventSubscribers['hasTakenDamage'] !== undefined) {
      var player = this;
      this.eventSubscribers['hasTakenDamage'].forEach(function(subscriber) {
        subscriber({damageAmount: bulletStrength, currentHealth: player._health});
      });
    }
  };

  Player.prototype.handleCollidedWithEnemy = function() {
    this._health = this._health - 10.0;
    if (this.eventSubscribers['hasTakenDamage'] !== undefined) {
      var player = this;
      this.eventSubscribers['hasTakenDamage'].forEach(function(subscriber) {
        subscriber({damageAmount: 10.0, currentHealth: player._health});
      });
    }
  };

  return Player;

});
