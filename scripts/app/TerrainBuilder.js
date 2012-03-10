"use strict";
define(['draw'],

function(draw) {

  var TerrainBuilder = function(world, Tile) {
    this.world = world;
    this.Tile = Tile;

    this.bufferWorld = Object.create(world);
    console.log(this.bufferWorld);
    this.bufferWorld.canvas = document.getElementById('bufferWorld').getContext('2d');
    this.bufferWorld.tiles = [];

    this.buffer = document.getElementById('world').getContext('2d'),

    this.factor = 100;

    this.tileWidth = world.width / this.factor;
    this.tileHeight = world.height / this.factor;
    this.tileSpeed = 1;
    this.rows = world.width / this.tileWidth;
    this.columns = world.height / this.tileHeight;
    this.loops = 0;

    var imageData = createImageData(this.bufferWorld, this.Tile, this, draw);
    pushImageDataToRealWorld(imageData, this.world, Tile, 0, 0, this.tileSpeed);

    var imageData = createImageData(this.bufferWorld, this.Tile, this, draw);
    pushImageDataToRealWorld(imageData, this.world, Tile, 0, -300, this.tileSpeed);

    this.imageData = null;
    var that = this;
    setInterval(function() {
      that.imageData = createImageData(that.bufferWorld, that.Tile, that, draw);
      console.log('new Terrain generated...');
    }, 5000);
  };

  TerrainBuilder.prototype.update = function() {
    this.loops++;
    if (this.loops === 300) {
      pushImageDataToRealWorld(this.imageData, this.world, this.Tile, 0, -300, this.tileSpeed);
      this.loops = 0;
      console.log('new Terrain sent...');
    }
  };

  return TerrainBuilder;

});

var pushImageDataToRealWorld = function(imageData, world, Tile, x, y, speed) {
  var tile = new Tile(world, {
    imageData: imageData,
    x: x,
    y: y,
    width: world.width,
    height: world.height,
    speed: speed
  });
  world.tiles.push(tile);
};

var createImageData = function(world, Tile, options, draw) {
  var tiles = generateTerrain(world, Tile, 0, 0, options.rows, options.columns, options.tileWidth, options.tileHeight, options.tileSpeed);
  tiles.forEach(function(tile) {
    world.tiles.push(tile);
  });

  draw(world);

  return world.canvas.getImageData(0, 0, world.width, world.height);
};

var generateTerrain = function(world, Tile, x, y, rows, columns, width, height, speed) {
  var tiles = [];
  for (var i=0; i < rows; i++) {
    for (var j=0; j < columns; j++) {
      tiles.push(new Tile(world, {
        color: '#F' + Math.round(Math.random() * 9) + 'F',
        x: x + (j * width),
        y: y + (i * height),
        width: width,
        height: height,
        speed: speed
      }));
    }
  }
  return tiles;
};
