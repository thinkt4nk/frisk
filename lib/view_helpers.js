
var Handlebars = require('handlebars');
var registerHelpers = function() {
	Handlebars.registerHelper('htmlEscape', function(text) {
		return new Handlebars.SafeString(text);
	});

};

exports.registerHelpers = registerHelpers;

