/**
 * The Task Model
 */
var model = require('../model').Model
	, util = require('util')
	, _ = require('underscore');

function Task() {
	model.apply(this, arguments);
};
util.inherits(Task, model);
Task.prototype.tableName = 'tasks';
Task.prototype._attributes = {
	id: {},
	state_id: {},
	title: {},
	detail: {}
}
Task.prototype.validate = function(data) {
	if (data.state_id == null || data.title == null || data.detail == null) {
		return this._invalidate(data);
	}
	if (data.id != null) {
		data.id = parseInt(data.id);
		if (isNaN(data.id)) {
			return this._invalidate(data);
		}
	}
	if ('string' === typeof data.title && 'string' === typeof data.detail) {
		return this._validate(data);
	}
	return this._invalidate(data);
}

module.exports = {
	model: function(app) {
		return new	Task(app);
	},
	Task: Task
}

