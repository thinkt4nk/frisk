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
			CREATE TABLE IF NOT EXISTS `tasks` (\
				`id` INTEGER UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,\
				`state_id` INTEGER UNSIGNED NOT NULL,\
				`title` VARCHAR(128) NOT NULL,\
				`detail` TEXT NOT NULL\
			)ENGINE=InnoDB DEFAULT CHARSET=utf8;\
		');
		queries.push('\
			ALTER TABLE `tasks` ADD CONSTRAINT `fk_tasks_states` FOREIGN KEY (`state_id`) REFERENCES `states`(`id`)\
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
				'DROP TABLE IF EXISTS `tasks`;'
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
