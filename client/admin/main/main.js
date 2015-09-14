define([
  "text!admin/main/main.html",
  "css!admin/main/main"
], function(
  template
) {

  return Backbone.View.extend({
    className: "admin-panel",
    initialize: function() {
      this.$el.html(template);
    }
  });

});