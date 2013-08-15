"use strict";
define(['lib/updateGamestate',
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

function(updateGamestate, draw, checkForCollisions, TerrainBuilder, World, Player, Enemy, Bullet, Explosion, Tile, Healthbar, $) {

  var Game = function(options, canvas, bufferCanvas, interfaceElements, context, sprites) {
    this.options = options;
    this.canvas = canvas;
    this.bufferCanvas = bufferCanvas;
    this.interfaceElements = interfaceElements;
    this.context = context;
    this.sprites = sprites;

    this.fps = 40;
  };

  var eventHandlers = {};
  Game.prototype.on = function(eventName, callback) {
    eventHandlers[eventName] = callback;
  };

  Game.prototype.start = function() {
    var game = this;

    var worldOptions = {
      width: this.options.world_width,
      height: this.options.world_height,
      terrainSpeed: 1
    };
    this.world = new World(worldOptions, this.context, this.sprites);

    var terrainBuilderOptions = {
      width: 740,
      height: 7560,
      tileWidth: 740,
      tileHeight: 1512
    };
    this.terrainBuilder = new TerrainBuilder(terrainBuilderOptions, this.world, this.bufferCanvas, Tile);
    this.terrainBuilder.createTerrain();

    var player = new Player(this.world, Bullet, Explosion, {
      health: 100.0,
      keyleft:  'left',
      keyright: 'right',
      keyup:    'up',
      keydown:  'down',
      keyfire:  'space'
    });
    this.world.addPlayer(player);

    var healthbar = new Healthbar(
      this.interfaceElements.healthinfoBar,
      this.interfaceElements.healthinfoMaxbar,
      player.health()
    );

    player.on('hasTakenDamage', healthbar.getHasTakenDamageSubscriber());
    player.on('died', eventHandlers['end']);

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
