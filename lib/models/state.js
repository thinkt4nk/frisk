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

module.exports = {
	model: function(app) {
		return new	State(app);
	},
	State: State
}

