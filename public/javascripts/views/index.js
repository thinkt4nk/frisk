(function($) {

	$.widget('frisk.indexview', $.frisk.base_widget, {
		options: {
			state_container: {
				states: [
				/* FIXTURES
					{ id: 1, title: "User Stories/Scope" },
					{ id: 1, title: "Development" },
					{ id: 1, title: "QA" },
					{ id: 1, title: "Acceptance" },
					{ id: 1, title: "Deployment" }
				*/
				]
			}
		},

		_create: function() {
			$.frisk.base_widget.prototype._create.apply(this, arguments);
			$('input:first').focus();
			this.elements.state_container = $('#state-container');
			this.elements.state_creator = $('form#add-state');
		},

		_init: function() {
			$.frisk.base_widget.prototype._init.apply(this, arguments);
			this.elements.state_container.state_container(this.options.state_container);

			this.elements.state_creator.bind('submit', $.proxy(this._stateCreator_submitHandler, this));
		},

		//==========================================
		// Event Handlers
		//==========================================
		_stateCreator_submitHandler: function(e) {
			e.preventDefault();
			var state_creator_form = $(e.target)
				, state_name_input = state_creator_form.find('input')
				, state_name = state_name_input.val()
				, state = (state_name != null && state_name != "")
					? { title: state_name }
					: null;

				if (state !== null) {
					this.elements.state_container.state_container('addState', state);
					state_name_input.val('');
				}
		}

		//==========================================
		// Private Implementation
		//==========================================

		//==========================================
		// Public Interface
		//==========================================

		//==========================================
		// Services
		//==========================================

	});

	// call view controller widget on document
	$(function() {
		$(document).indexview();
	});

})(jQuery);
