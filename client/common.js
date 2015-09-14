define(function() {

  return {
    isMobile: function() {
      return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/) ? true : false;
    },
    routeTo: function(path) {
      Backbone.history.navigate(path, { trigger: true });
      return false;
    },
    checkResolution: function() {
      var width = $(document).innerWidth();
      if (width < 320) {
        return "<320";
      }
      else if (width > 320 && width < 768) {
        return "320>768";
      }
      else if (width > 768 && width < 1024) {
        return "768>1024";
      }
      else if (width > 1024 && width < 1366) {
        return "1024>1366";
      }
      else if (width > 1366 && width < 1680) {
        return "1366>1680";
      }
      else if (width > 1680) {
        return "1680>";
      }
    }
  };

});