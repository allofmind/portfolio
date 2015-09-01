define([
  "text!modules/releases/template.html",
  "css!modules/releases/style"
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