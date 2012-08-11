(function($) {

	$.widget('frisk.state_container', $.frisk.base_widget, {

		widgetBaseClass: 'frisk-state-container',

		options: {
			state_max_width: 300, // pixels
			min_gutter_width: 10, // pixels
			states: [],
			state_sortable: {
				items: '.frisk-state',
				placeholder: 'ui-state-highlight frisk-state'
			}
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

			this.element.sortable(this.options.state_sortable);
			this.element.disableSelection();
			this.element.bind('sortupdate', $.proxy(this._state_sortUpdateHandler, this));
			this.element.bind('sortstart', $.proxy(this._state_sortStartHandler, this));
			this.templates.state = $.template('task', $('#state-template').html());
		},

		//==========================================
		// Event Handlers
		//==========================================
		_state_sortStartHandler: function(e, ui) {
			var state = this.element.find('.frisk-state')
				, width = Math.floor(parseFloat(state.css('width').replace(/px/,'')))
				, margin = Math.floor(parseFloat(state.css('margin-right').replace(/px/,'')));

			this.element.find('.ui-state-highlight.frisk-state').css({
				width: width + 'px',
				height: '100px',
				'margin-right': margin
			});
		},

		_state_sortUpdateHandler: function(e, ui) {
			var states = this.element.find('.frisk-state')
				, state_count = states.length
				, state_list = []
				, state_container = this;

			states.each(function(i) {
				var state_element = $(this)
					, state = {
							id: parseInt(state_element.data('id')),
							title: state_element.data('title'),
							order: state_element.data('order')
						};
				state_list.push(state);
				if (i === (state_count - 1)) {
					state_container.element.trigger('state-sortupdate', {state_list: state_list});
				}
			});
		},

		//==========================================
		// Private Implementation
		//==========================================
		_redraw: function(options) {
			options = options || {};
			var state_count = options.state_count || this.element.find('.frisk-state').length
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
			this.element.find('.frisk-state').each(function(i) {
				var state = $(this)
					, padding = state.css('padding-left').replace(/px/,'') + state.css('padding-right').replace(/px/,'')
					, width = state_width - padding; // 2px side border
				state
					.width(width)
					.css('margin-right', state_margin + 'px');
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
		redraw: function(options) {
			this._redraw();
		},

		addState: function(options) {
			options = options || {};
			var state = $.tmpl(this.templates.state, options).state()
				, uid = state.data('uid');

			this.element.append(state);
			this._redraw();
			return state;
		},

		destroy: function() {
			// cascade for all encapsulated state elements
			for (var uid in this.elements.states) {
				this.elements.states[uid].state('destroy');
			}
		}
	});

})(jQuery);
