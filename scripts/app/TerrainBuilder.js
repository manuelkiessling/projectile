"use strict";
define(['draw'],

function(draw) {

  var TerrainBuilder = function(world, Tile) {
    this.world = world;
    this.Tile = Tile;

    this.bufferWorld = Object.create(world);
    this.bufferWorld.canvas = document.getElementById('bufferWorld').getContext('2d');
    this.bufferWorld.tiles = [];

    this.tilesPerDimension = 8;

    // Options for generating one screen of the world
    this.options = {};
    this.options.xOffset = 0;
    this.options.yOffset = 0;
    this.options.tileWidth = world.width / this.tilesPerDimension;
    this.options.tileHeight = world.height / this.tilesPerDimension;
    this.options.rows = world.width / this.options.tileWidth;
    this.options.columns = world.height / this.options.tileHeight;

    // Generate 20 full screens and put them one below the other
    for (var i = 0; i < 10; i++) {
      var imageData = createImageData(this.bufferWorld, this.Tile, this.options, draw);
      pushImageDataToWorld(imageData, this.world, Tile, 0, -(this.world.height * i), this.world.width, this.world.height);
    }
  };

  var loops = 0;
  var rowNumber = 0;
  TerrainBuilder.prototype.update = function() {
    if (loops === (this.world.height / this.tilesPerDimension) * (1 / this.world.terrainSpeed)) {
      //generateRow(this, rowNumber, draw);
      loops = 0;
      rowNumber++;
    }
    loops++;
  };

  return TerrainBuilder;

});

var generateRow = function(terrainBuilder, rowNumber, draw) {
  var options = {
    rows: 1,
    columns: terrainBuilder.options.columns,
    tileWidth: terrainBuilder.options.tileWidth,
    tileHeight: terrainBuilder.options.tileHeight,
    xOffset: 0,
    yOffset: rowNumber * terrainBuilder.options.tileHeight
  };
  createImageData(terrainBuilder.bufferWorld, terrainBuilder.Tile, options, draw);
};

var pushImageDataToWorld = function(imageData, world, Tile, x, y, width, height) {
  var tile = new Tile(world, {
    imageData: imageData,
    x: x,
    y: y,
    width: width,
    height: height,
    speed: world.terrainSpeed
  });
  world.tiles.push(tile);
};

var createImageData = function(world, Tile, options, draw) {
  var tiles = generateTerrain(world, Tile, options.xOffset, options.yOffset, options.rows, options.columns, options.tileWidth, options.tileHeight);
  tiles.forEach(function(tile) {
    world.tiles.push(tile);
  });

  draw(world);

  return world.canvas.getImageData(0, 0, options.columns * options.tileWidth, options.rows * options.tileHeight);
};

var generateTerrain = function(world, Tile, xOffset, yOffset, rows, columns, width, height) {
  var tiles = [];
  var sprite = 'grass';
  var rand;
  for (var i=0; i < rows; i++) {
    for (var j=0; j < columns; j++) {
      rand = Math.random();
      if (rand < 0.05) {
        sprite = 'yellowtrees';
      } else if (rand < 0.1) {
        sprite = 'greentrees'
      } else {
        sprite = 'grass'
      }
      tiles.push(new Tile(world, {
        sprite: 'terrain_' + sprite,
        x: xOffset + (j * width),
        y: yOffset + (i * height),
        width: width,
        height: height,
        speed: 0
      }));
    }
  }
  return tiles;
};
