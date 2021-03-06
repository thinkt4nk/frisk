var mysql = require('mysql')
	, _ = require('underscore');

function Model(app) {
	this.options = app.settings.db;
}
Model.prototype = {
	tableName: null,
	_attributes: {},
	validate: function(data) {
		_.extend(data, {
			__isValid: true
		});
		console.log('returning data from model::',data);
		return data;
	},
	_validate: function(data) {
		return _.extend(data, {
			__isValid: true
		});
	},
	_invalidate: function(data) {
		return _.extend(data, {
			__isValid: false
		});
	},
	query: function(query, success, error) {
		var params = []
			, db;
		if (typeof success === 'object') {
			var params = success;
			success = error;
			error = arguments[3];
		}
		console.log('querying::',[query, params]);
		db = mysql.createConnection(this.options);
		db.connect();
		db.query(query, params, function(err, rows, fields) {
			if (err && err.length > 0) {
				db.end();
				error(err);
			}
			else {
				db.end();
				success(rows, fields);
			}
		});
	},
	findByPk: function(pk, success, error) {
		var query = 'SELECT * FROM `'+ this.tableName +'` WHERE `id` = ?';
		this.query(query, [parseInt(pk)], success, error);
	},
	_parseObject: function(object) {
		var values = []
			, columns = [];
		_.each(object, function(value, column) {
			// do not parse metadata
			if (! /^__/.test(column)) {
				columns.push('`' + column + '`');
				values.push(value);
			}
		});
		return {
			columns: columns,
			values: values
		};
	},
	deleteByPk: function(pk, success, error) {
		var query = 'DELETE FROM `'+ this.tableName +'` WHERE `id` = ?';
		this.query(query, [parseInt(pk)], success, error);
	},
	find: function(object, success, error) {
		var object_parts = this._parseObject(object)
			, query = 'SELECT * FROM `' + this.tableName + '` WHERE '
			, query_parts = ['1=1'];

		_.each(object_parts.columns, function(column, i) {
			query_parts.push(column + ' = ?');
		});
		query += query_parts.join(' AND ');
		if (this.order != null) {
			query += " ORDER BY " + this.order;
		}
		this.query(query, object_parts.values, success, error);
	},
	create: function(model, success, error) {
		var query = 'INSERT INTO `'+ this.tableName + '` ('
			, object_parts = this._parseObject(model);

		query += object_parts.columns.join(',');
		query += ') VALUES (';
		var params = [];
		for (var i=0; i < object_parts.values.length; i++) { params.push('?'); }
		query += params.join(',');
		query += ')';
		this.query(
			query, 
			object_parts.values, 
			_.bind(function() {
				// TODO: find a way to retrieve the complete record while avoiding a race condition
				var query = "SELECT * FROM `" + this.tableName + "` ORDER BY `id` DESC LIMIT 1";
				this.query(
					query,
					function(results) {
						if (results.length > 0) {
							success.call(null, results[0]);
						}
					},
					error
				);
			}, this), 
			error
		);
	},
	update: function(id, model, success, error) {
		var query = 'UPDATE `'+ this.tableName + '` SET '
			, object_parts = this._parseObject(model)
			, i
			, query_segments = [];

		for (i = 0; i < object_parts.columns.length; i++) {
			query_segments.push(object_parts.columns[i] + ' = ?');
		}
		query += query_segments.join(',');
		query += ' WHERE `id` = ?';
		object_parts.values.push(id);

		this.query(query, object_parts.values, success, error);
	}
};

module.exports = {
		Model: Model
};

