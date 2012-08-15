(function($) {

	$.widget('frisk.base_widget', {

		_create: function() {
			$.Widget.prototype._create.apply(this, arguments);
			this.elements = {};
			this.templates = {};
		},

		_init: function() {
			$.Widget.prototype._init.apply(this, arguments);
		},

		_guid : function() {
			var S4 = function() {
				return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			};

			return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
		},
	});

})(jQuery);
