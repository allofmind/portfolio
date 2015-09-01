define([
  "modules/main/view",
  "modules/panel-loader/view",
  "css!styles/fonts",
  "css!styles/font-awesome",
  "css!styles/common"
], function(
  MainView,
  PanelLoader
) {

  var mainView = new MainView();

  TweenMax.to($(".splash-sceen"), 0.1, {
    opacity: 0,
    onStart: function() {
      $(".splash-sceen").removeClass("active");
      $(".splash-sceen").find(".loader").removeClass("run");
    },
    onComplete: function() {
      $(".splash-sceen").remove();
    }
  });

  var MainRouter = Backbone.Router.extend({
    lastViewName: undefined,
    cacheInstances: [ ],
    speed: 0.6,
    viewPriorities: {
      "salute": "0",
      "releases": "1",
      "interesting": "2",
      "interested": "3"
    },
    coordinates: {
      "top": {
        opacity: 0,
        yPercent: -100,
        rotationX: 90,
        ease: Power3.easeInOut
      },
      "center": {
        opacity: 1,
        yPercent: 0,
        rotationX: 0,
        ease: Power3.easeInOut
      },
      "bottom": {
        opacity: 0,
        yPercent: 100,
        rotationX: -90,
        ease: Power3.easeInOut
      }
    },
    routes: {
      "": function() {
        this.generalHandler("releases");
      },
      "salute": function() {
        this.generalHandler("salute");
      },
      "interesting": function() {
        this.generalHandler("interesting");
      },
      "interested": function() {
        this.generalHandler("interested");
      }
    },
    generalHandler: function(name) {
      var that = this;
      var cacheInstances = this.cacheInstances;
      var $parentContainer = $(".panel-container");

      var parentContainerHeight = $parentContainer.height();

      var cacheInstance = { };
      cacheInstances.push(cacheInstance);
      cacheInstance.name = name;
      var id = (new Date()).getTime();
      cacheInstance.id = id;

      var prevInstance = cacheInstances.slice(-2, -1)[0];

      if (prevInstance) {
        var speed = this.speed;
      }

      if (prevInstance) {
        var currentPriority = this.viewPriorities[cacheInstance.name];
        var prevPriority = this.viewPriorities[prevInstance.name];
        var animationType = currentPriority > prevPriority ? 0 : 1;
      }

      if (prevInstance) {
        var topCoordinates = _.extend({}, this.coordinates.top);
        var centerCoordinates = _.extend({}, this.coordinates.center);
        var bottomCoordinates = _.extend({}, this.coordinates.bottom);
      }

      if (prevInstance) {
        var prevView = prevInstance.view;
        var prevLoader = prevInstance.loader;
        var $prevContainer = prevInstance.$container;

        if (animationType === 0) {
          var hideCoordinates = topCoordinates;
          if (prevView) {
            prevView.$el.css("transform-origin", "50% 100%");
          }
          else if($prevContainer) {
            $prevContainer.css("transform-origin", "50% 0");
          }
        }
        else if (animationType === 1) {
          var hideCoordinates = bottomCoordinates;
          if (prevView) {
            prevView.$el.css("transform-origin", "0 0");
          }
          else if($prevContainer) {
            $prevContainer.css("transform-origin", "0 100%");
          }
        }

        if (prevView) {
          hideCoordinates.onComplete = function() {
            if (prevLoader) {
              prevLoader.destroy();
            }
            prevView.remove();
            $prevContainer.remove();
            if (cacheInstances.length > 1) {
              cacheInstances.shift();
            }
          }
          TweenMax.to(prevView.$el, speed, hideCoordinates);
        }
        else if($prevContainer) {
          hideCoordinates.onComplete = function() {
            if (prevLoader) {
              prevLoader.destroy();
            }
            $prevContainer.remove();
            if (cacheInstances.length > 1) {
              cacheInstances.shift();
            }
          }
          TweenMax.to($prevContainer, speed, hideCoordinates);
        }
      }

      var $container = $("<div/>", { class: "panel-box" });
      cacheInstance.$container = $container;
      if (prevInstance) {
        if (animationType === 0) {
          var showCoordinates = bottomCoordinates;
          $container.css("transform-origin", "0 0");
        }
        else if (animationType === 1) {
          var showCoordinates = topCoordinates;
          $container.css("transform-origin", "0 100%");
        }
        TweenMax.fromTo($container, speed, showCoordinates, centerCoordinates);
      }

      var instanceName = "".concat(name.slice(0, 1).toUpperCase(), name.slice(1, name.lenght));
      var Instance = this[instanceName];
      if (Instance) {
        var view = new Instance();
        $container.append(view.$el);
        cacheInstance.view = view;
        $parentContainer.append($container);
        return;
      }
      else {
        var loader = new PanelLoader($container);
        cacheInstance.loader = loader;
        loader.run();
        $parentContainer.append($container);
      }

      require([ "modules/" + name + "/view" ], function(Instace) {
        var lastInstance = cacheInstances.slice(-1)[0];
        var lastInstanceId = lastInstance.id;
        that[instanceName] = Instace;
        if (lastInstanceId === id) {
          var view = new Instace();
          TweenMax.fromTo(view.$el, 0.3, {
              opacity: 0,
            }, {
              opacity: 1,
              onStart: function() {
                loader.destroy();
              }
          });
          $container.append(view.$el);
          cacheInstance.view = view;
        }
      });
    }
  });

  var mainRouter = new MainRouter();

  $("a#to-salute").click(function() {
    mainRouter.navigate("salute", { trigger: true });
    return false;
  });

  $("a#to-release").click(function() {
    mainRouter.navigate("", { trigger: true });
    return false;
  });

  $("a#to-interesting").click(function() {
    mainRouter.navigate("interesting", { trigger: true });
    return false;
  });

  $("a#to-interested").click(function() {
    mainRouter.navigate("interested", { trigger: true });
    return false;
  });

  Backbone.history.start({ pushState: true });

});