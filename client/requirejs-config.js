requirejs.config({
  map: {
    "*": {
      "text": "libraries/text",
      "css": "libraries/css"
    }
  },
  shim: {
    "application-init": {
      deps: [ "application-config" ]
    },
    "application-config": {
      deps: [ "libraries/backbone", "libraries/TweenMax.min", "libraries/jquery.mobile.custom.js" ]
    },
    "libraries/backbone": {
      deps: [ "libraries/underscore", "libraries/jquery-2.1.4" ],
      exports: "Backbone"
    },
    "libraries/underscore": {
      exports: "_"
    },
    "libraries/jquery.mobile.custom.js": {
      deps: [ "libraries/jquery-2.1.4" ]
    }
  },
  waitSeconds: 50
});

require([ "application-config", "application-init" ]);