define([
  "text!modules/user/interesting/template.html",
  "css!modules/user/interesting/style"
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