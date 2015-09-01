define([
  "text!modules/interested/template.html",
  "css!modules/interested/style"
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