/**
 * Create Tasks Table
 */
var env = process.env.NODE_ENV
	, base_path = [__dirname, '..'].join('/')
	, config_path = [base_path, 'config'].join('/')
	, config = require([config_path, env].join('/')).db
	, mysql = require('mysql');

exports.up = function(next){
		var query_count =0
			, i
			, queries = [];

		queries.push('\
			ALTER TABLE `tasks` MODIFY `state_id` INTEGER UNSIGNED\
		');

		db = mysql.createConnection(config);
		db.connect();
		for (i = 0; i < queries.length; i++) {
			db.query(queries[i], {}, function(err, rows, fields) {
				if (err) {
					console.log('ERROR in migration: ' + err)
				}
				else {
					if (++query_count === queries.length) {
						db.end();
						next();
					}
				}
			});
		}
};

exports.down = function(next){
		var query_count = 0
			, i
			, queries = [
				'ALTER TABLE `tasks` MODIFY `state_id` INTEGER UNSIGNED NOT NULL'
			];

		db = mysql.createConnection(config);
		db.connect();
		for (i = 0; i < queries.length; i++) {
			db.query(queries[i], {}, function(err, rows, fields) {
				if (err) {
					console.log('ERROR in migration: ' + err)
				}
				else {
					if (++query_count === queries.length) {
						db.end();
						next();
					}
				}
			});
		}
};
