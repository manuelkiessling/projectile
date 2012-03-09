"use strict";
define([],

function() {

  var TerrainBuilder = function(world, Tile) {
    this.world = world;
    this.Tile = Tile;
    this.tileWidth = 40;
    this.tileHeight = 40;
    this.tileSpeed = 0.8;
    this.rows = world.width / this.tileWidth;
    this.columns = world.height / this.tileHeight;

//    var tiles = generateTerrain(world, Tile, 0, 0, this.rows, this.columns, this.tileWidth, this.tileHeight, this.tileSpeed);
//    tiles.forEach(function(tile) {
//      world.tiles.push(tile);
//    });
  };

  TerrainBuilder.prototype.update = function() {
    //
  }

  return TerrainBuilder;

});

var generateTerrain = function(world, Tile, x, y, rows, columns, width, height, speed) {
  var tiles = [];
  for (var i=0; i < rows; i++) {
    for (var j=0; j < columns; j++) {
      tiles.push(new Tile(world, {
        color: '#F' + Math.round(Math.random() * 9) + 'F',
        x: i * width,
        y: j * height,
        width: width,
        height: height,
        speed: speed
      }));
    }
  }
  return tiles;
};
