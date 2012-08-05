var URLHelper = {
	buildAjaxURL: function (path) {
		if(path == undefined) path = "";
		return 'http://'+ModelLocator.configuration.subdomain+'.'+ModelLocator.configuration.server+'/'+ModelLocator.configuration.controller+'.php/seo/ajax/' + path;
	},
	buildURL: function(path) {
		if (path == null)
			path = "";
		return 'http://' + ModelLocator.configuration.subdomain + '.' + ModelLocator.configuration.server + '/' + ModelLocator.configuration.controller + '.php/seo/' + path;
	},
	buildQuery: function (data) {

		if(typeof data == "undefined") {
			data = {};
		}

		var query = $.extend(true, {}, data);

		query.user_id = ModelLocator.user.id;
		query.client_id = ModelLocator.user.client_id;

		if (ModelLocator.page.id != null && ModelLocator.page.id != undefined && ModelLocator.page.id != 'na'){
			query.parent_id = ModelLocator.page.id;
		}

		if("from" in query && typeof query.from == "object" ) {
			query.from = DateFormatter.convertJsDateToMysqlDate(query.from);
		}
		if("to" in query && typeof query.to == "object" ) {
			query.to = DateFormatter.convertJsDateToMysqlDate(query.to);
		}

		if("historical_from" in query && typeof query.historical_from == "object" ) {
			query.historical_from = DateFormatter.convertJsDateToMysqlDate(query.historical_from);
		}
		if("historical_to" in query && typeof query.historical_to == "object" ) {
			query.historical_to = DateFormatter.convertJsDateToMysqlDate(query.historical_to);
		}		
		return {"query":JSON.stringify(query)};
	}

};

var ko = ko || {};
ko.URLHelper = URLHelper;
