var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var autoIncrement   = require('mongoose-auto-increment');
var passport        = require('passport');
var consign         = require('consign');

// database setup
var mongoose = require('mongoose');
var mongodbUrl = process.env.MONGODB_URL || 'mongodb://192.168.1.181/parko-project';
mongoose.connect(mongodbUrl);

autoIncrement.initialize(mongoose);

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

var parko = {
    express: express,
    app: app,
    db: {
        mongoose: mongoose,
        plugins: {
            autoIncrement: autoIncrement
        }
    },
    createRouter: function() {
        return this.express.Router()
    },
    registerRoute: function(name, router) {
        this.app.use(name, router);
    },
    registerModel: function(name, schema) {
        schema.plugin(this.db.plugins.autoIncrement.plugin, {
            model: name,
            field: 'id',
            startAt: 1 //Adding a field numeric auto increment
        });
        return this.db.mongoose.model(name, schema);
    }
}

consign()
    .include('modules')
    .then('models')
    .then('controllers')
    .then('routes')
    .into(parko);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500).json({
          message: err.message,
          error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
