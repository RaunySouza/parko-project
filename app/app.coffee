'use strict'

express         = require 'express'
path            = require 'path'
favicon         = require 'serve-favicon'
logger          = require 'morgan'
cookieParser    = require 'cookie-parser'
bodyParser      = require 'body-parser'
autoIncrement   = require 'mongoose-auto-increment'
passport        = require 'passport'
consign         = require 'consign'
mongoose        = require 'mongoose'

#Database setup
mongoDbUrl = process.env.MONGODB_URL or 'mongodb://192.168.99.100/parko-project'
mongoose.connect mongoDbUrl

autoIncrement.initialize mongoose

app = express()

app.set 'view engine', 'jade'
#uncomment after placing your favicon in /public
#app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use logger 'dev'
app.use bodyParser.json()
app.use bodyParser.urlencoded extended: false
app.use cookieParser()
app.use express.static path.join __dirname, 'public'
app.use (req, res, next) ->
  res.setHeader 'Access-Control-Allow-Origin', '*'
  res.setHeader 'Access-Control-Allow-Methods', 'GET, POST'
  res.setHeader 'Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization'
  next()
  return

parko =
  express: express
  app: app
  db:
    mongoose: mongoose
    plugins:
      autoIncrement: autoIncrement
  createRouter: () ->
    this.express.Router()
  registerRoute: (name, router) ->
    this.app.use name, router
    return
  registerModel: (name, schema) ->
    schema.plugin this.db.plugins.autoIncrement.plugin,
      model: name
      field: 'id'
      startAt: 1
    this.db.mongoose.model name, schema

consign()
.include 'models'
.then 'controllers'
.then 'routes'
.into parko

#catch 404 and forward to error handler
app.use (req, res, next) ->
  err = new Error 'Not Found'
  err.status = 404
  next err
  return

#Error Handlers

#development error handler
#will print stacktrace
if app.get('env') is 'development'
  app.use (err, req, res, next) ->
    res.status err.status or 500
    res.render 'error',
      message: err.message
      error: err
    return

#production error handler
#no stacktraces leaked to user
app.use (err, req, res, next) ->
  res.status err.status or 500
  res.render 'error',
    message: err.message
    error: {}
  return

module.exports = app
