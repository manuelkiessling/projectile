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

    this.factor = 10;

    this.tileWidth = world.width / this.factor;
    this.tileHeight = world.height / this.factor;
    this.tileSpeed = 1;
    this.rows = world.width / this.tileWidth;
    this.columns = world.height / this.tileHeight;
    this.loops = 0;

    // create a set of tiles for one full world-area
    var imageData = createImageData(this.bufferWorld, this.Tile, this, draw);
    pushImageDataToRealWorld(imageData, this.world, Tile, 0, 0, this.tileSpeed);

    // create one row of tiles
    generateAndPushRow(this, draw);
  };

  TerrainBuilder.prototype.update = function() {
    this.loops++;
    if (this.loops === 80) {
      generateAndPushRow(this, draw);
      this.loops = 0;
      console.log('new Terrain sent...');
    }
  };

  return TerrainBuilder;

});

var generateAndPushRow = function(terrainBuilder, draw) {
  var options = {
    rows: 1,
    columns: terrainBuilder.columns,
    tileWidth: terrainBuilder.tileWidth,
    tileHeight: terrainBuilder.tileHeight,
    tileSpeed: 0
  };
  var imageData = createImageData(terrainBuilder.bufferWorld, terrainBuilder.Tile, options, draw);
  pushImageDataToRealWorld(imageData, terrainBuilder.world, terrainBuilder.Tile, 0, -options.tileHeight, terrainBuilder.world.width, options.tileHeight, terrainBuilder.tileSpeed);
};

var pushImageDataToRealWorld = function(imageData, world, Tile, x, y, width, height, speed) {
  var tile = new Tile(world, {
    imageData: imageData,
    x: x,
    y: y,
    width: width,
    height: height,
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

  return world.canvas.getImageData(0, 0, options.columns * options.tileWidth, options.rows * options.tileHeight);
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
