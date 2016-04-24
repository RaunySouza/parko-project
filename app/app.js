var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var load = require('express-load');
var autoIncrement = require('mongoose-auto-increment');

// database setup
var mongoose = require('mongoose');
var mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost/parko-project';
mongoose.connect(mongodbUrl);

autoIncrement.initialize(mongoose);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

load('modules')
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
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
