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
    this.tileSpeed = 1.1;
    this.rows = world.width / this.tileWidth;
    this.columns = world.height / this.tileHeight;
    this.loops = 0;

    var tiles = generateTerrain(this.bufferWorld, Tile, 0, -(this.factor * this.tileHeight), this.rows + 100, this.columns, this.tileWidth, this.tileHeight, this.tileSpeed);
    var that = this;
    tiles.forEach(function(tile) {
      that.bufferWorld.tiles.push(tile);
    });

    draw(this.bufferWorld);

    var imageData = this.bufferWorld.canvas.getImageData(0, 0, this.bufferWorld.width, this.bufferWorld.height);
    var tile = new Tile(world, {
      imageData: imageData,
      x: 0,
      y: 0,
      width: this.world.width,
      height: this.world.height,
      speed: this.tileSpeed
    });
    this.world.tiles.push(tile);
  };

  return TerrainBuilder;

});

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
