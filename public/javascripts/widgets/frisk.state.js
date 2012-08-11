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

			this.element.find('.remove').click($.proxy(function(e) {
				var state = $(e.target).closest('.frisk-state')
					, model = {
							id: parseInt(state.data('id')),
							title: state.data('title'),
							order: parseInt(state.data('order'))
						};
				console.log('model::',model);
				this.element.trigger('remove-state', model);
			}, this));
		},

		//==========================================
		// Event Handlers
		//==========================================

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
