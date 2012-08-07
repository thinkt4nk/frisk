(function($) {

	$.widget('frisk.indexview', $.frisk.base_widget, {
		options: {
			state_container: {
				states: [
					{ id: 1, title: "meh", detail: "meh" },
					{ id: 1, title: "meh", detail: "meh" },
					{ id: 1, title: "meh", detail: "meh" },
					{ id: 1, title: "meh", detail: "meh" },
					{ id: 1, title: "meh", detail: "meh" }
				]
			}
		},

		_create: function() {
			$.frisk.base_widget.prototype._create.apply(this, arguments);
			this.elements.state_container = $('#state-container');
		},

		_init: function() {
			$.frisk.base_widget.prototype._init.apply(this, arguments);
			this.elements.state_container.state_container(this.options.state_container);
		}
	});

	// call view controller widget on document
	$(function() {
		$(document).indexview();
	});

})(jQuery);
