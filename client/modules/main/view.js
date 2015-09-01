define([
  "text!modules/main/template.html",
  "css!modules/main/style"
], function(
  template
) {

  $("body").append(template);

  return Backbone.View.extend({
    el: $("body"),
    active: false,
    speed: 0.3,
    events: {
      "click .header-navigation": "toggler"
    },
    toggler: function() {
      var that = this;
      if (!this.active) {
        TweenMax.to(this.$el, that.speed, {
          x: -250,
          ease: Power1.easeInOut,
          onStart: function() {
            that.active = true;
          }
        });
      }
      else {
        TweenMax.to(this.$el, that.speed, {
          x: 0,
          ease: Power1.easeInOut,
          onStart: function() {
            that.active = false;
          }
        });
      }
    }
  });

});