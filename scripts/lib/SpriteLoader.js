"use strict";
define([],

function() {

  var SpriteLoader = function() {};

  SpriteLoader.prototype.load = function(folder, names, extension, callback) {
    var counter = 0;
    var sprites = {};
    names.forEach(function(name) {
      var imgage = new Image();
      imgage.onload = function() {
        counter++;
        sprites[name] = imgage;
        if (counter === names.length) {
          callback(sprites);
        }
      };
      imgage.src = folder + '/' + name + '.png';
    });
  };

  return SpriteLoader;

});
