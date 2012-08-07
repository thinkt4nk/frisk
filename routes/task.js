var util = require('util');

var get = function(req, res){
	var model = require('../lib/models/task').model(req.app);

	// get specific
	if (req.params.length > 0 && /\d+/.test(req.params[0])) {
		console.log('getting specific::',req.params[0]);
		model.findByPk(
			req.params[0],
			function(results, fields) {
				if (results.length > 0) {
					res.json(results[0]);
				}
			},
			function(err) {
				console.log('an error occurred while retrieving specific model:', err); 
				res.redirect('/404');
			}
		);
	}
	// get all
	else{
		model.find(
			{},
			function(results, fields) {
				res.json(results);
			},
			function(err) {
				console.log('an error occurred while retrieving specific model:', err); 
				res.redirect('/404');
			}
		);
	}
};

var put = function(req, res) {
	var model = require('../lib/models/task').model(req.app)
			, data = model.validate(req.body);

	// update task object
	if (req.params.length > 0 && /\d+/.test(req.params[0])) {
		var id = parseInt(req.params[0]);

		if (data.__isValid) {
			model.update(
				id,
				data,
				function(results, fields) {
					if (results.length > 0) {
						res.json(data);
						res.end();
					}
				},
				function(err) {
					console.log('an error occurred while trying to update a specific model:', err);
					res.redirect('/500');
				}
			);
		}
	}
	// create task object
	else {
		console.log('form data::',req.body);
		if (data.__isValid) {
			model.create(
				data,
				function(results, fields) {
					res.json(data);
					console.log('ending response');
					res.end();
				},
				function(err) {
					console.log('an error occurred while trying to create model:', err);
					res.redirect('/500');
				}
			);
		}
	}
};

var post = function(req, res) {
	res.redirect('/404');
}

var del = function(req, res) {
	var model = require('../lib/models/task'.model(req.app));

	if (req.params.length > 0 && /\d+/.test(req.params[0])) {
		model.deleteByPk(parseInt(req.params[0]));
	}
}

/*
 * API Handler for Task Module */
module.exports = {
	router: function(req, res) {
		console.log('method::',req.method);
		switch (req.method)
		{
			case 'GET':
				get.apply(null, arguments);
				break;
			case 'PUT':
				put.apply(null, arguments);
				break;
			case 'POST':
				post.apply(null, arguments);
				break;
			case 'DELETE':
				del.apply(null, arguments);
				break;
		}
	},
};
