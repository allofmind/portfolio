define([
  "common",
  "user/panel-loader/view"
  , "user/main/view"
], function(
  common,
  PanelLoader
  , MainView
) {

  var BodyView = Backbone.View.extend({
    el: $("body"),
    events: {
      "touchstart #to-main": function() { common.routeTo(""); },
      "touchstart #to-manager": function() { common.routeTo("manager"); },
      "click #to-main": function() { common.routeTo(""); },
      "click #to-manager": function() { common.routeTo("manager"); }
    },
    initialize: function() {
      var $splashsceen = this.$el.find(".splash-sceen");
      TweenMax.to($splashsceen, 0.1, {
        opacity: 0,
        onStart: function() {
          $splashsceen.removeClass("active");
          $splashsceen.find(".loader").removeClass("run");
        },
        onComplete: function() {
          $splashsceen.remove();
        }
      });
    }
  });

  var bodyView = new BodyView();

  return MainRouter = Backbone.Router.extend({
    routes: {
      "": function() { this.generalHandler("user-main", $("<main/>", { class: "main-container" }), "user/main/view"); },
      "manager": function() { this.generalHandler("admin-main", $("<main/>", { class: "main-container" }), "admin/main/main"); }
    },
    cacheViews: [ ],
    speed: 0.6,
    ease: Power3.easeInOut,
    viewPriorities: {
      "admin-main": "0",
      "user-main": "1"
    },
    coordinates: {
      "top": {
        opacity: 0,
        z: -100
        // set: {
        //   "transform-origin": "0 100%"
        // },
        // dynamic: {
        //   opacity: 0,
        //   z: -100,
        //   rotationY: -90
        // }
      },
      "center": {
        opacity: 1,
        z: 0
      },
      "bottom": {
        opacity: 0,
        z: 100
      }
    },
    generalHandler: function(name, $container, path) {
      var that = this;
      var cacheViews = this.cacheViews;
      var $parentContainer = bodyView.$el;
  
      var parentContainerHeight = $parentContainer.height();
  
      var cacheInstance = { };
      cacheViews.push(cacheInstance);
      cacheInstance.name = name;
      var id = (new Date()).getTime();
      cacheInstance.id = id;
  
      var prevInstance = cacheViews.slice(-2, -1)[0];
  
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
        topCoordinates.ease = centerCoordinates.ease = bottomCoordinates.ease = this.ease;
      }
  
      if (prevInstance) {
        var prevView = prevInstance.view;
        var prevLoader = prevInstance.loader;
        var $prevContainer = prevInstance.$container;
  
        if (animationType === 0) {
          var hideCoordinates = topCoordinates;
          $prevContainer.css("transform-origin", "100% 0");
        }
        else if (animationType === 1) {
          var hideCoordinates = bottomCoordinates;
          $prevContainer.css("transform-origin", "0 100%");
        }

        hideCoordinates.onComplete = function() {
          if (prevLoader) {
            prevLoader.destroy();
          }
          if (prevView) {
            prevView.remove();
          }
          $prevContainer.remove();
          if (cacheViews.length > 1) {
            cacheViews.shift();
          }
        };

        TweenMax.to($prevContainer, speed, hideCoordinates);
      }

      cacheInstance.$container = $container;
      if (prevInstance) {
        if (animationType === 0) {
          var showCoordinates = bottomCoordinates;
          $container.css("transform-origin", "0 0");
        }
        else if (animationType === 1) {
          var showCoordinates = topCoordinates;
          $container.css("transform-origin", "100% 0");
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
  
      require([ path ], function(Instace) {
        var lastInstance = cacheViews.slice(-1)[0];
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

  // var mainView = new MainView();

  // return MainRouter = Backbone.Router.extend({
  //   lastViewName: "",
  //   cacheInstances: [ ],
  //   speed: 0.6,
  //   ease: Power3.easeInOut,
  //   viewPriorities: {
  //     "salute": "0",
  //     "releases": "1",
  //     "interesting": "2",
  //     "interested": "3"
  //   },
  //   coordinates: {
  //     "top": {
  //       opacity: 0,
  //       yPercent: -100,
  //       rotationX: 90
  //     },
  //     "center": {
  //       opacity: 1,
  //       yPercent: 0,
  //       rotationX: 0
  //     },
  //     "bottom": {
  //       opacity: 0,
  //       yPercent: 100,
  //       rotationX: -90
  //     }
  //   },
  //   routes: {
  //     "salute": function() {
  //       this.generalHandler("salute");
  //     },
  //     "": function() {
  //       this.generalHandler("releases");
  //     },
  //     "interesting": function() {
  //       this.generalHandler("interesting");
  //     },
  //     "interested": function() {
  //       this.generalHandler("interested");
  //     }
  //   },
  //   generalHandler: function(name) {
  //     var that = this;
  //     var cacheInstances = this.cacheInstances;
  //     var $parentContainer = $(".panel-container");
  
  //     var parentContainerHeight = $parentContainer.height();
  
  //     var cacheInstance = { };
  //     cacheInstances.push(cacheInstance);
  //     cacheInstance.name = name;
  //     var id = (new Date()).getTime();
  //     cacheInstance.id = id;
  
  //     var prevInstance = cacheInstances.slice(-2, -1)[0];
  
  //     if (prevInstance) {
  //       var speed = this.speed;
  //     }
  
  //     if (prevInstance) {
  //       var currentPriority = this.viewPriorities[cacheInstance.name];
  //       var prevPriority = this.viewPriorities[prevInstance.name];
  //       var animationType = currentPriority > prevPriority ? 0 : 1;
  //     }
  
  //     if (prevInstance) {
  //       var topCoordinates = _.extend({}, this.coordinates.top);
  //       var centerCoordinates = _.extend({}, this.coordinates.center);
  //       var bottomCoordinates = _.extend({}, this.coordinates.bottom);
  //       topCoordinates.ease = centerCoordinates.ease = bottomCoordinates.ease = this.ease;
  //     }
  
  //     if (prevInstance) {
  //       var prevView = prevInstance.view;
  //       var prevLoader = prevInstance.loader;
  //       var $prevContainer = prevInstance.$container;
  
  //       if (animationType === 0) {
  //         var hideCoordinates = topCoordinates;
  //         if (prevView) {
  //           prevView.$el.css("transform-origin", "50% 100%");
  //         }
  //         else if($prevContainer) {
  //           $prevContainer.css("transform-origin", "50% 0");
  //         }
  //       }
  //       else if (animationType === 1) {
  //         var hideCoordinates = bottomCoordinates;
  //         if (prevView) {
  //           prevView.$el.css("transform-origin", "0 0");
  //         }
  //         else if($prevContainer) {
  //           $prevContainer.css("transform-origin", "0 100%");
  //         }
  //       }
  
  //       if (prevView) {
  //         hideCoordinates.onComplete = function() {
  //           if (prevLoader) {
  //             prevLoader.destroy();
  //           }
  //           prevView.remove();
  //           $prevContainer.remove();
  //           if (cacheInstances.length > 1) {
  //             cacheInstances.shift();
  //           }
  //         }
  //         TweenMax.to(prevView.$el, speed, hideCoordinates);
  //       }
  //       else if($prevContainer) {
  //         hideCoordinates.onComplete = function() {
  //           if (prevLoader) {
  //             prevLoader.destroy();
  //           }
  //           $prevContainer.remove();
  //           if (cacheInstances.length > 1) {
  //             cacheInstances.shift();
  //           }
  //         }
  //         TweenMax.to($prevContainer, speed, hideCoordinates);
  //       }
  //     }
  
  //     var $container = $("<div/>", { class: "panel-box" });
  //     cacheInstance.$container = $container;
  //     if (prevInstance) {
  //       if (animationType === 0) {
  //         var showCoordinates = bottomCoordinates;
  //         $container.css("transform-origin", "0 0");
  //       }
  //       else if (animationType === 1) {
  //         var showCoordinates = topCoordinates;
  //         $container.css("transform-origin", "0 100%");
  //       }
  //       TweenMax.fromTo($container, speed, showCoordinates, centerCoordinates);
  //     }
  
  //     var instanceName = "".concat(name.slice(0, 1).toUpperCase(), name.slice(1, name.lenght));
  //     var Instance = this[instanceName];
  //     if (Instance) {
  //       var view = new Instance();
  //       $container.append(view.$el);
  //       cacheInstance.view = view;
  //       $parentContainer.append($container);
  //       return;
  //     }
  //     else {
  //       var loader = new PanelLoader($container);
  //       cacheInstance.loader = loader;
  //       loader.run();
  //       $parentContainer.append($container);
  //     }
  
  //     require([ "user/" + name + "/view" ], function(Instace) {
  //       var lastInstance = cacheInstances.slice(-1)[0];
  //       var lastInstanceId = lastInstance.id;
  //       that[instanceName] = Instace;
  //       if (lastInstanceId === id) {
  //         var view = new Instace();
  //         TweenMax.fromTo(view.$el, 0.3, {
  //             opacity: 0,
  //           }, {
  //             opacity: 1,
  //             onStart: function() {
  //               loader.destroy();
  //             }
  //         });
  //         $container.append(view.$el);
  //         cacheInstance.view = view;
  //       }
  //     });
  //   }
  // });

});