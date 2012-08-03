var env = process.env.NODE_ENV
	, base_path = [__dirname, '..'].join('/')
	, config_path = [base_path, 'config'].join('/')
	, config = require([config_path, env].join('/')).db
	, mysql = require('mysql');

exports.up = function(next){
		var query_count =0
			, i
			, queries = [];

		queries[0] = '\
			CREATE TABLE IF NOT EXISTS `states` (\
				`id` INTEGER UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,\
				`title` VARCHAR(128) NOT NULL,\
				`order` INTEGER NOT NULL DEFAULT 0\
			)ENGINE=InnoDB DEFAULT CHARSET=utf8;\
		';

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
				'DROP TABLE IF EXISTS `states`;'
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
