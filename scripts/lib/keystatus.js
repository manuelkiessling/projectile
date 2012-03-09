"use strict";
define(['jquery',
        '../vendor/jquery.hotkeys'],

function($) {

  var keydown = {};

  function keyName(event) {
    return $.hotkeys.specialKeys[event.which] ||
      String.fromCharCode(event.which).toLowerCase();
  }

  $(document).bind("keydown", function(event) {
    keydown[keyName(event)] = true;
  });
  
  $(document).bind("keyup", function(event) {
    keydown[keyName(event)] = false;
  });

  return { keydown: keydown };

});
