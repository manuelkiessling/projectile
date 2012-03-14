"use strict";
define([],

function() {
  var clamp = function(pos, min, max) {
    return Math.min(Math.max(pos, min), max);
  };

  var webglEnabled = function() {
    var canvas = document.createElement('canvas');
    try {
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  };

  return { clamp: clamp, webglEnabled: webglEnabled };
});
