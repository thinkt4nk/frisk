


var get = function(req, res){
	// get specific
	if (req.params.length > 0 && /\d+/.test(req.params[0])) {
		console.log('getting specific::',req.params[0]);
	}
	// get all
	else{
		console.log('getting all::',req.params);
	}
};

var put = function(req, res) {

};

var post = function(req, res) {

};

var del = function(req, res) {

};

/*
 * API Handler for Task Module
 */
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
