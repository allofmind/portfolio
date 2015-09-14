define([
  "text!admin/authorized/template.html"
], function(
  template
) {

  return Backbone.View.extend({
    initialize: function() {
      this.$el.html(template);
    }
  });

});