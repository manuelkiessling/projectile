"use strict";
define(['/base/htdocs/js/interfaceelements/Healthbar.js'], function(Healthbar) {

  describe("Healthbar", function() {
  
    it("updates the CSS width of the health bar element when calling the hasTakenDamage subscriber ", function() {
      var hasBeenCalledCorrectly = false;
      var mockBarElement = {};
      mockBarElement.css = function(attr, value) {
        if (attr == 'width' && value == '2.0px') {
          hasBeenCalledCorrectly = true;
        }
      };
      var mockMaxbarElement = {};
      mockMaxbarElement.css = function(attr, value) {
      };
      var healthbar = new Healthbar(mockBarElement, mockMaxbarElement, 2.0);
      healthbar.getHasTakenDamageSubscriber()({damageAmount: 1.0, currentHealth: 1.0});
    });

  });

});
