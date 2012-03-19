"use strict";
define(['jquery',
        'util',
        'update',
        'draw',
        'collider',
        '../domain/World',
        '../domain/Player',
        '../domain/Enemy',
        '../domain/Bullet',
        '../domain/Explosion',
        '../domain/Tile',
        'TerrainBuilder',
        '../vendor/requestAnimFrame',
        '../vendor/requestInterval',
        '../vendor/requestTimeout',
        '../vendor/webgl-2d',
        '../vendor/browserdetect'
       ],

function($, util, update, draw, collider, World, Player, Enemy, Bullet, Explosion, Tile, TerrainBuilder) {

  var Game = function(options, canvas, bufferCanvas, sprites) {
    this.options = options;
    this.canvas = canvas;
    this.bufferCanvas = bufferCanvas;
    this.sprites = sprites;

    this.fps = 40;
    this.remainingTime = 60;
  };

  var eventHandlers = {};
  Game.prototype.on = function(eventName, callback) {
    eventHandlers[eventName] = callback;
  };

  Game.prototype.start = function() {
    var game = this;
    var canvas = this.options.canvas;

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
    var world = new World(worldOptions, context, this.sprites);

    var terrainBuilderOptions = {
      width: 740,
      height: 7560,
      tileWidth: 740,
      tileHeight: 1512
    };
    var terrainBuilder = new TerrainBuilder(terrainBuilderOptions, world, this.bufferCanvas, Tile);
    terrainBuilder.createTerrain();

    world.addPlayer(new Player(world, Bullet, Explosion, {
      keyleft: 'left',
      keyright: 'right',
      keyup: 'up',
      keydown: 'down',
      keyfire: 'space'
    }));

    var gameloop = requestInterval(function() {
      collider(world);
      update(world, Enemy, Bullet, Explosion);
      draw(world);
    }, 1000 / game.fps);

    requestTimeout(function() {
      clearRequestInterval(gameloop);
      eventHandlers['end']();
    }, game.runtime * 1000);
  };

  return Game;

});
