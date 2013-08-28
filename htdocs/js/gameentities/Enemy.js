"use strict";
define(['lib/util'],

function(util) {

  var Enemy = function(world, Bullet, Explosion, options) {
    this.world = world;
    this.Bullet = Bullet;
    this.Explosion = Explosion;

    this.spriteName = options.spriteName || 'enemy';

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
  };

  Enemy.prototype.hitbox = function() {
    return {
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

    this.x = Math.round(this.x);
    this.y = Math.round(this.y);

    this.age++;

    this.active = this.active && this.inBounds();

    // Shoot if a Player is in line
    if (   this.midpoint().x >= this.world.players[0].hitbox.x
        && this.midpoint().x <= (this.world.players[0].hitbox.x + this.world.players[0].hitbox.width)) {
      this.shoot();
    }
  };

  Enemy.prototype.draw = function() {
    //this.world.drawRectangle("#ff0000", this.x, this.y, this.width, this.height);
    //this.world.drawRectangle("#ffffff", this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
    this.world.drawSprite(this.spriteName, this.x, this.y, this.width, this.height);
    //this.world.drawRectangle("#000000", this.midpoint().x, this.midpoint().y, 1, 40);
  };

  Enemy.prototype.inBounds = function() {
    return this.hitbox().x >= (-this.hitbox().width) && this.hitbox().x <= this.world.width + this.hitbox().width &&
           this.hitbox().y >= (- 400) && this.hitbox().y <= this.world.height + this.hitbox().height;
  };

  Enemy.prototype.midpoint = function() {
    return {
      x: (this.hitbox().x + this.hitbox().width/2),
      y: (this.hitbox().y + this.hitbox().height/2)
    }
  }

  Enemy.prototype.shoot = function() {
    this.world.bullets.push(
      new this.Bullet(this.world, this.Explosion, {
        x: (this.hitbox().x + this.hitbox().width/2) - 21,
        y: (this.hitbox().y + this.hitbox().height) - 47,
        width: 141,
        height: 144,
        hitboxMetrics: {
          x: 19,
          y: 26,
          width: 4,
          height: 19
        },
        direction: 'down',
        speed: 5,
        acceleration: -0.6,
        owner: this.type,
        spriteName: 'enemyBullet'
      }
    ));
  };

  Enemy.prototype.handleHitByBullet = function(damageAmount) {
    this.active = false;
    this.world.explosions.push(new this.Explosion(this.world, {
      x: this.x,
      y: this.y
    }));
  };

  Enemy.prototype.handleCollidedWithPlayer = function() {
    this.handleHitByBullet();
  }

  return Enemy;

});
