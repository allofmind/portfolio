define([

], function() {

  document.body.addEventListener("touchstart", function(event){ event.preventDefault(); });

  $.event.special.swipe.durationThreshold = 500;
  $.event.special.swipe.horizontalDistanceThreshold = 150;

});