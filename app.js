
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
	, view_helpers = require('./lib/view_helpers')
	, MySQLSessionStore = require('connect-mysql-session')(express)
	// create application
	, app = module.exports = express.createServer()
	// load config for application environment
	, config = require('./config/' + app.settings.env);


view_helpers.registerHelpers();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'handlebars');
	app.set('db', config.db);
  app.use(express.bodyParser());
  app.use(express.cookieParser());
	/*
  app.use(express.session({ 
			secret: 'there once was a man from nantucket' ,
			store: new MySQLSessionStore(config.db.database, config.db.user, config.db.password)
	}));
	*/
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
//app.get('/test', routes.test);
app.all('/tasks/*', routes.task.router);
app.all('/states/*', routes.state.router);


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
