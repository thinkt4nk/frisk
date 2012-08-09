(function($) {

	$.widget('frisk.state', $.frisk.base_widget, {

		options: {
			tasks: {}
		},

		_create: function() {
			$.frisk.base_widget.prototype._create.apply(this, arguments);

			this.element.data('uid', this._guid());
		},

		_init: function() {
			$.frisk.base_widget.prototype._init.apply(this, arguments);

			this.element.find('.remove').click($.proxy(this._remove_clickHandler, this));
		},

		//==========================================
		// Event Handlers
		//==========================================
		_remove_clickHandler: function(e) {
			this.element.trigger('remove-state', e);
			this.element.remove();
		},

		//==========================================
		// Private Implementation
		//==========================================
		_redraw: function() {

		},

		//==========================================
		// Public Interface
		//==========================================
		destroy: function() {

		}

	});

})(jQuery);
