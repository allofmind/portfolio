define([
  "common",
  "text!user/main/template.html",
  "css!user/main/style"
], function(
  common,
  template
) {

  return Backbone.View.extend({
    className: "user-interface",
    active: false,
    speed: 0.3,
    distance: 0,
    coordinatesGrid: {
      "<320": {
        main: { open: { x: -150 }, close: { x: 0 } },
        mainNavContainer: { open: { x: -150, rotationY: 0 }, close: { x: 0, rotationY: -90 } }
      },
      "320>768": {
        main: { open: { x: -200 }, close: { x: 0 } },
        mainNavContainer: { open: { x: -200, rotationY: 0 }, close: { x: 0, rotationY: -90 } }
      },
      "768>1024": {
        main: { open: { x: -250 }, close: { x: 0 } },
        mainNavContainer: { open: { x: -250, rotationY: 0 }, close: { x: 0, rotationY: -90 } }
      },
      "1024>1366": {
        main: { open: { x: 0 }, close: { x: 0 } },
        mainNavContainer: { open: { x: 0, rotationY: 0 }, close: { x: 0, rotationY: 0 } }
      },
      "1366>1680": {
        main: { open: { x: 0 }, close: { x: 0 } },
        mainNavContainer: { open: { x: 0, rotationY: 0 }, close: { x: 0, rotationY: 0 } }
      },
      "1680>": {
        main: { open: { x: 0 }, close: { x: 0 } },
        mainNavContainer: { open: { x: 0, rotationY: 0 }, close: { x: 0, rotationY: 0 } }
      }
    },
    currentCoordinates: { },
    currentResolution: "",
    ease: Power2.easeOut,
    isMobile: common.isMobile(),
    updateProportion: function() {
      var currentResolution = common.checkResolution();
      if (this.currentResolution !== currentResolution) {
        this.currentCoordinates = this.coordinatesGrid[currentResolution];
        this.updatePosition();
      }
    },
    initialize: function() {
      var that = this;
      this.$el.html(template);
      this.$menuButton = this.$el.find(".menu-button");
      this.$mainContentContainer = this.$el.find(".main-content-container");
      this.$mainNavContainer = this.$el.find(".main-nav-container");
      this.updateProportion();
      this.updateEvents();
      $(window).resize(function() {
        that.updateProportion();
        var isMobile = common.isMobile();
        if (that.isMobile !== isMobile) {
          that.isMobile = isMobile;
          that.updateEvents();
        }
      });
    },
    updateEvents: function() {
      var that = this;
      if (common.isMobile()) {
        this.undelegateEvents();
        this.delegateEvents({
          "touchstart .header-navigation": "toggler",
          "swipeleft .panel-container": "show",
          "swiperight .panel-container": "hide",
          "touchstart a#to-salute": function() { common.routeTo("salute"); },
          "touchstart a#to-releases": function() { common.routeTo(""); },
          "touchstart a#to-interesting": function() { common.routeTo("interesting"); },
          "touchstart a#to-interested": function() { common.routeTo("interested"); }
        });
      }
      else {
        this.undelegateEvents();
        this.delegateEvents({
          "click .header-navigation": "toggler",
          "click a#to-salute": function() { common.routeTo("salute"); },
          "click a#to-releases": function() { common.routeTo(""); },
          "click a#to-interesting": function() { common.routeTo("interesting"); },
          "click a#to-interested": function() { common.routeTo("interested"); }
        });
      }
    },
    toggler: function() {
      if (!this.active) {
        this.show();
      }
      else {
        this.hide();
      }
    },
    show: function() {
      this.currentCoordinates.main.open.ease = Power1.easeInOut;
      TweenMax.to(this.$mainContentContainer, this.speed, this.currentCoordinates.main.open);
      this.currentCoordinates.mainNavContainer.open.ease = Power1.easeInOut;
      TweenMax.to(this.$mainNavContainer, this.speed, this.currentCoordinates.mainNavContainer.open);
      this.active = true;
      this.$menuButton.addClass("active");
    },
    hide: function() {
      this.currentCoordinates.main.close.ease = Power1.easeInOut;
      TweenMax.to(this.$mainContentContainer, this.speed, this.currentCoordinates.main.close);
      this.currentCoordinates.mainNavContainer.close.ease = Power1.easeInOut;
      TweenMax.to(this.$mainNavContainer, this.speed, this.currentCoordinates.mainNavContainer.close);
      this.active = false;
      this.$menuButton.removeClass("active");
    },
    updatePosition: function() {
      if (this.active) {
        TweenMax.set(this.$mainContentContainer, this.currentCoordinates.main.open);
        TweenMax.set(this.$mainNavContainer, this.currentCoordinates.mainNavContainer.open);
      }
      else {
        TweenMax.set(this.$mainContentContainer, this.currentCoordinates.main.close);
        TweenMax.set(this.$mainNavContainer, this.currentCoordinates.mainNavContainer.close);
      }
    }
  });

});