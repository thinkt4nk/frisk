/**
 * The Task Model
 */
var model = require('../model').Model
	, util = require('util');

function Task() {
	model.apply(this, arguments);
};
util.inherits(Task, model);
Task.prototype.tableName = 'tasks';

module.exports = {
	model: function(app) {
		return new	Task(app);
	},
	Task: Task
}

