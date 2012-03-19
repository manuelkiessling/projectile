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
    return false; // do not let the keydown event through to the browser
  });
  
  $(document).bind("keyup", function(event) {
    keydown[keyName(event)] = false;
    return false; // do not let the keydown event through to the browser
  });

  return { keydown: keydown };

});
