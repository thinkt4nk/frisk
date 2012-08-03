var util = require('util');

var get = function(req, res){
	var model = require('../lib/models/state').model(req.app);

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
	var model = require('../lib/models/state').model(req.app);

	// update state object
	if (req.params.length > 0 && /\d+/.test(req.params[0])) {
		var id = parseInt(req.params[0])
			, data = model.validate(req.body.state);

		if (data.__isValid) {
			model.update(
				id,
				data,
				function(results, fields) {
					if (results.length > 0) {
						res.json(data);
					}
				},
				function(err) {
					console.log('an error occurred while trying to update a specific model:', err);
					res.redirect('/500');
				}
			);
		}
	}
	// create state object
	else {
		if (data.__isValid) {
			model.create(
				data,
				function(results, fields) {
					if (results.length > 0) {
						res.json(data);
					}
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
	var model = require('../lib/models/state').model(req.app);

	if (req.params.length > 0 && /\d+/.test(req.params[0])) {
		this.deleteByPk(parseInt(req.params[0]));
	}
};

/*
 * API Handler for State Module */
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
