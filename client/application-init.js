define([
  "router",
  "css!styles/fonts",
  "css!styles/font-awesome",
  "css!styles/common"
], function(
  MainRouter
) {

  var mainRouter = new MainRouter();

  Backbone.history.start({ pushState: true });

});