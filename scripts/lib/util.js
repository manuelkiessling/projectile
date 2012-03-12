"use strict";
define([],

function() {
  var clamp = function(pos, min, max) {
    return Math.min(Math.max(pos, min), max);
  };
  return { clamp: clamp };
});
