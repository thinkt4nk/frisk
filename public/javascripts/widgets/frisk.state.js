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
				this.element.trigger('remove-state', model);
			}, this));
			this.element.find('.frisk-task').on('remove-task', $.proxy(this._task_removeTaskHandler, this));
		},

		//==========================================
		// Event Handlers
		//==========================================
		_task_removeTaskHandler: function(e) {

		},

		//==========================================
		// Private Implementation
		//==========================================
		_redraw: function() {

		},

		//==========================================
		// Public Interface
		//==========================================
		addTask: function() {

		},

		destroy: function() {

		}

	});

})(jQuery);
