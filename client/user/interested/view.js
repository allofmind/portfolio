define([
  "text!modules/user/interested/template.html",
  "css!modules/user/interested/style"
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