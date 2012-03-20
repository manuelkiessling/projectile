"use strict";
define(['jquery',
        '../lib/util',
        '../lib/update',
        '../lib/draw',
        '../lib/collider',
        '../lib/TerrainBuilder',
        '../domain/World',
        '../domain/Player',
        '../domain/Enemy',
        '../domain/Bullet',
        '../domain/Explosion',
        '../domain/Tile',
        '../vendor/requestAnimFrame',
        '../vendor/requestInterval',
        '../vendor/requestTimeout',
        '../vendor/webgl-2d',
        '../vendor/browserdetect'
       ],

function($, util, update, draw, collider, TerrainBuilder, World, Player, Enemy, Bullet, Explosion, Tile) {

  var Game = function(options, canvas, bufferCanvas, sprites) {
    this.options = options;
    this.canvas = canvas;
    this.bufferCanvas = bufferCanvas;
    this.sprites = sprites;

    this.fps = 40;
  };

  var eventHandlers = {};
  Game.prototype.on = function(eventName, callback) {
    eventHandlers[eventName] = callback;
  };

  Game.prototype.start = function() {
    var game = this;
    var canvas = this.canvas;

    var context;
    if (util.webglEnabled()) {
      WebGL2D.enable(canvas);
      context = canvas.getContext('webgl-2d');
      eventHandlers['webglDetectionFinished'](true);
    } else {
      context = canvas.getContext('2d');
      eventHandlers['webglDetectionFinished'](false);
    }

    var worldOptions = {
      context: context,
      width: this.options.world_width,
      height: this.options.world_height,
      terrainSpeed: 1
    };
    this.world = new World(worldOptions, context, this.sprites);

    var terrainBuilderOptions = {
      width: 740,
      height: 7560,
      tileWidth: 740,
      tileHeight: 1512
    };
    this.terrainBuilder = new TerrainBuilder(terrainBuilderOptions, this.world, this.bufferCanvas, Tile);
    this.terrainBuilder.createTerrain();

    this.world.addPlayer(new Player(this.world, Bullet, Explosion, {
      keyleft:  'left',
      keyright: 'right',
      keyup:    'up',
      keydown:  'down',
      keyfire:  'space'
    }));

    var handlePlayerIsHit = function() {
      eventHandlers['playerIsHit']();
    };

    var handleEnemyIsKilled = function() {
      eventHandlers['enemyIsKilled']();
    };

    var gameloop = requestInterval(function() {
      collider(game, handlePlayerIsHit, handleEnemyIsKilled);
      update(game, Enemy, Bullet, Explosion);
      draw(game.world);
    }, 1000 / game.fps);

    requestTimeout(function() {
      clearRequestInterval(gameloop);
      eventHandlers['end']();
    }, game.options.runtime * 1000);

    eventHandlers['start']();
  };

  return Game;

});
