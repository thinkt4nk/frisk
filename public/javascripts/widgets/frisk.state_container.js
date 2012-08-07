(function($) {

	$.widget('frisk.state_container', $.frisk.base_widget, {

		widgetBaseClass: 'frisk-state-container',

		options: {
			state_max_width: 300, // pixels
			min_gutter_width: 10, // pixels
			states: []
		},

		_create: function() {
			$.frisk.base_widget.prototype._create.apply(this, arguments);

			$.each(this.options.states, $.proxy(function(i, state) {
				this.addState(state);
			}, this));
			this.element.addClass(this.widgetBaseClass);
		},

		_init: function() {
			$.frisk.base_widget.prototype._init.apply(this, arguments);
		},

		//==========================================
		// Event Handlers
		//==========================================
		_state_removeHandler: function(e, data) {
			if (data.uid != null && this.elements.states[data.uid] != null) {
				delete this.elements.states[data.uid];
			}
			this._redraw();
		},


		//==========================================
		// Private Implementation
		//==========================================
		_redraw: function() {
			var state_count = Object.keys(this.elements.states).length
				, container_padding = parseInt(this.element.css('padding-left').replace(/px/,'')) + parseInt(this.element.css('padding-right').replace(/px/,''))
				, container_margin = parseInt(this.element.css('margin-left').replace(/px/,'')) + parseInt(this.element.css('margin-right').replace(/px/,''))
				, container_width = this.element.width() - container_padding - container_margin
				, state_margin = this.options.min_gutter_width
				, state_total_margin = (state_count * state_margin)
				, available_width = (container_width - state_total_margin)
				, state_width = Math.floor(available_width / state_count);

			// enforce max width
			if (state_width > this.options.state_max_width) {
				state_width = this.options.state_max_width;
			}
			if (state_count === 5) {
				console.log('meh');
			}
			this.element.find('.frisk-state').each(function(i) {
				var state = $(this)
					, padding = state.css('padding-left').replace(/px/,'') + state.css('padding-right').replace(/px/,'')
					, width = state_width - padding; // 2px side border
				state
					.width(width)
					.css('margin-left', state_margin + 'px');
			});
		},

		_setOption: function(key, value) {
			switch (key)
			{
				case 'states':
					// not supported
					break;
				case 'state_max_width':
				case 'min_gutter_width':
					this._redraw();
					break;
			}
		},

		//==========================================
		// Public Interface
		//==========================================
		addState: function(options) {
			options = options || {};
			var uid = this._guid()
				, state = $('<div/>')
					.data('uid', uid)
					.state(options);

			this.elements.states = this.elements.states || {};
			this.elements.states[uid] = state;
			this.element.append(state);
			this._redraw();
		},

		destroy: function() {
			// cascade for all encapsulated state elements
			for (var uid in this.elements.states) {
				this.elements.states[uid].state('destroy');
			}
		}
	});

})(jQuery);
