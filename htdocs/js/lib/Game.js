"use strict";
define(['lib/util',
        'lib/updateGamestate',
        'lib/draw',
        'lib/checkForCollisions',
        'lib/TerrainBuilder',
        'gameentities/World',
        'gameentities/Player',
        'gameentities/Enemy',
        'gameentities/Bullet',
        'gameentities/Explosion',
        'gameentities/Tile',
        'interfaceelements/Healthbar',
        'vendor/requestAnimFrame',
        'vendor/requestInterval',
        'vendor/requestTimeout',
        'vendor/webgl-2d',
        'vendor/browserdetect',
        'jquery'
       ],

function(util, updateGamestate, draw, checkForCollisions, TerrainBuilder, World, Player, Enemy, Bullet, Explosion, Tile, Healthbar, $) {

  var Game = function(options, canvas, bufferCanvas, interfaceElements, sprites) {
    this.options = options;
    this.canvas = canvas;
    this.bufferCanvas = bufferCanvas;
    this.interfaceElements = interfaceElements;
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

    var player = new Player(this.world, Bullet, Explosion, {
      keyleft:  'left',
      keyright: 'right',
      keyup:    'up',
      keydown:  'down',
      keyfire:  'space'
    });
    this.world.addPlayer(player);

    var healthbar = new Healthbar(this.interfaceElements.healthinfoValue);

    player.on('hasTakenDamage', healthbar.getHasTakenDamageSubscriber());

    var gameloop = requestInterval(function() {
      checkForCollisions(game);
      updateGamestate(game, Enemy, Bullet, Explosion);
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
