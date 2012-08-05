
var state = require('./state')
	, task = require('./task');

/*
 * GET home page.
 */
module.exports = {
	index: function(req, res){
		res.render('index', { title: 'Frisk' });
	},
	test: function(req, res) {
		res.render(
			'test', 
			{
				title: 'Frisk Test',
				scripts: [
					'/javascripts/views/test.js'
				],
				styles: []
			}
		);
	},
	state: state,
	task: task
};
