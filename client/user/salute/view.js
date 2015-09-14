define([
  "text!modules/user/salute/template.html",
  "css!modules/user/salute/style"
], function(
  template,
  style
) {

  return Backbone.View.extend({
    tagName: "article",
    className: "panel",
    events: {
      "change .color-switcher": function(event) {
        var $current = $(event.target);
        var colorCode = $current.val();
        $("body").css({ color: colorCode });
      }
    },
    initialize: function() {
      this.$el.append(template);
    }
  });

});