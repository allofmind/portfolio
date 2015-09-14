define([
  "text!user/panel-loader/template.html",
  "css!user/panel-loader/style"
], function(
  template
) {

  return Backbone.View.extend({
    className: "main-loader",
    initialize: function($container) {
      this.$container = $container;
      this.$el.append(template);
    },
    run: function() {
      var that = this;
      TweenMax.fromTo(this.$el, 0.1, {
        opacity: 0
      }, {
        opacity: 1,
        onStart: function() {
          that.$container.append(that.$el);
        }
      });
    },
    destroy: function() {
      var that = this;
      TweenMax.to(this.$el, 0.1, {
        opacity: 0,
        onComplete: function() {
          that.remove();
        }
      });
    }
  });

});