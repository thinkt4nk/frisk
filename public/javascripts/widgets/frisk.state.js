(function($) {

	$.widget('frisk.state', $.frisk.base_widget, {
			
			widgetBaseClass: 'frisk-state',

			options: {
				tasks: {}
			},

			_create: function() {
				$.frisk.base_widget.prototype._create.apply(this, arguments);

				this.element
					.addClass(this.widgetBaseClass)
					.data('uid', this._guid());
			},

			_init: function() {
				$.frisk.base_widget.prototype._init.apply(this, arguments);

				this._addTitle();
				this._addRemove();
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
			_addTitle: function() {
				var title_el = $('<div>');

				title_el
					.addClass('title')
					.text(this.options.title)
					.appendTo(this.element);
			},

			_addRemove: function() {
				var remove_el = $('<div>').addClass('remove');

				remove_el.click($.proxy(this._remove_clickHandler, this));
				this.element.append(remove_el);
			},

			_redraw: function() {

			},

		//==========================================
		// Public Interface
		//==========================================
			destroy: function() {

			}

	});

})(jQuery);
