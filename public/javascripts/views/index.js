(function($) {

	$.widget('frisk.indexview', $.frisk.base_widget, {
		options: {
			state_container: {
				states: []
			}
		},

		_create: function() {
			$.frisk.base_widget.prototype._create.apply(this, arguments);

			this.elements.state_container = $('#state-container');
			this.elements.state_creator = $('form#add-state');
			this.elements.task_creator = $('form#add-task');
			this.elements.task_creator_toggle = $('#add-task-toggle');
			this.templates.task = $.template('task', $('#task-template').html());
		},

		_init: function() {
			$.frisk.base_widget.prototype._init.apply(this, arguments);

			this._installStateContainer();

			this.elements.state_container.bind('remove-state', $.proxy(this._stateContainer_removeStateHandler, this));
			this.elements.state_container.bind('state-sortupdate', $.proxy(this._stateContainer_sortUpdateHandler, this));
			this.elements.state_creator.bind('submit', $.proxy(this._stateCreator_submitHandler, this));
			this.elements.task_creator.bind('submit', $.proxy(this._taskCreator_submitHandler, this));
			this.elements.task_creator_toggle.click($.proxy(this._taskCreatorToggle_clickHandler, this));

			$('input:first').focus();

			// index.js
			console.log($.getModule('frisk.util').returnMeh());
		},

		//==========================================
		// Event Handlers
		//==========================================
		_stateContainer_sortUpdateHandler: function(e, data) {
			if (data.state_list != null) {
				$.each(data.state_list, function(i, state) {
					state.order = i;
					$.getService('frisk').postStateUpdate(
						state,
						function(response) {
							// pass
						},
						function(response) {
							// stub
						}
					);
				});
			}
		},
		_stateContainer_removeStateHandler: function(e, data) {
			if (data.id != null) {
				var id = parseInt(data.id)
					, view = this;

				if (!isNaN(id)) {
					$.getService('frisk').postDeleteState(
						{id: id},
						function(response) {
							// pass
							var state = $(e.target).closest('.frisk-state');
							state.remove();
							view.elements.state_container.state_container('redraw');
						},
						function(response) {
							alert('An error occurred while trying to delete the state');
						}
					);
				}
			}
		},

		_taskCreatorToggle_clickHandler: function(e) {
			if (this.elements.task_creator.is(':visible')) {
				this.elements.task_creator.hide('fast');
			}
			else {
				this.elements.task_creator.show('fast');
			}
		},

		_taskCreator_submitHandler: function(e) {
			e.preventDefault();

			var view = this
				, title = this.elements.task_creator.find('input[type="text"]')
				, detail = this.elements.task_creator.find('textarea')
				, new_task = {
						title: title,
						detail: detail
					};

			// create new task
			$.getService('frisk').postCreateTask(
				new_task,
				function(response, status) {
					if (status === 'success' && 'object' === typeof response) {
						// TODO: Finish
						//var task_element = $.tmpl(this.templates
					}
				},
				function(response) {
					alert('An error occurred while trying to create the new task');
				}
			);

			// reset values and set focus in title
			details.val('');
			title.val('').focus();
		},

		_stateCreator_submitHandler: function(e) {
			e.preventDefault();
			var state_creator_form = $(e.target)
				, state_name_input = state_creator_form.find('input')
				, state_name = state_name_input.val()
				, state = (state_name != null && state_name != "")
					? { title: state_name }
					: null;

				if (state !== null) {
					$.getService('frisk').postCreateState(
						state,
						$.proxy(function(response, status) {
							this.elements.state_container.state_container('addState', response);
							state_name_input.val('');
						}, this),
						$.proxy(function(response) {
							alert('A problem occurred while trying to create the state.');
						}, this)
					);
				}
		},

		//==========================================
		// Private Implementation
		//==========================================
		_installStateContainer: function() {
			this.elements.state_container.state_container(this.options.state_container);
			var view = this;
			$.getService('frisk').getStates(
				{},
				function(response, status) {
					$.each(response, function(i, model) {
						view.elements.state_container.state_container('addState', model);
					});
				},
				function(response) {
					alert('A problem occurred while trying to retrieve states.');
				}
			);
		}

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
