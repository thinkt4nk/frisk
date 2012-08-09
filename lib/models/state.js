/**
 * The State Model
 */
var model = require('../model').Model
	, util = require('util');

function State() {
	model.apply(this, arguments);
};
util.inherits(State, model);
State.prototype.tableName = 'states';
State.prototype._attributes = {
	id: {},
	title: {},
	order: {}
};
State.prototype.validate = function(data) {
	if (data.title != null) {
		if ('string' === typeof data.title) {
			if (data.order != null) {
				data.order = parseInt(data.order);
			}
			return this._validate(data);
		}
	}
	return this._invalidate(data);
}

module.exports = {
	model: function(app) {
		return new	State(app);
	},
	State: State
}

