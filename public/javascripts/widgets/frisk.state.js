(function($) {

	$.widget('frisk.state', $.frisk.base_widget, {
			
			widgetBaseClass: 'frisk-state',

			options: {
				tasks: {}
			},

			_create: function() {
				$.frisk.base_widget.prototype._create.apply(this, arguments);

			},

			_init: function() {
				$.frisk.base_widget.prototype._init.apply(this, arguments);

				this.element.addClass(this.widgetBaseClass);
				this.element.append($('<div/>').addClass('title').text(this.options.title));
			},

			_redraw: function() {

			},

			destroy: function() {

			}

	});

})(jQuery);
