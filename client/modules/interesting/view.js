define([
  "text!modules/interesting/template.html",
  "css!modules/interesting/style"
], function(
  template,
  style
) {

  return Backbone.View.extend({
    tagName: "article",
    className: "panel",
    initialize: function() {
      this.$el.append(template);
    }
  });

});