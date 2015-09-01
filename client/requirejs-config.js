requirejs.config({
  map: {
    "*": {
      "text": "libraries/text",
      "css": "libraries/css"
    }
  },
  shim: {
    "application": {
      deps: [ "libraries/backbone", "libraries/TweenMax.min" ]
    },
    "libraries/backbone": {
      deps: [ "libraries/underscore", "libraries/jquery-2.1.4" ],
      exports: "Backbone"
    },
    "libraries/underscore": {
      exports: "_"
    },
    "libraries/jquery.mobile-1.4.5.js": {
      deps: [ "libraries/jquery-2.1.4" ]
    }
  },
  waitSeconds: 50
});

require([ "application" ]);