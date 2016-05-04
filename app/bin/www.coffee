'use strict'

app = require '../app'
debug = require('debug')('test:server')
http = require 'http'

normalizePort = (value) ->
  p = parseInt value, 10

  if isNaN p
    return value

  if p >= 0
    return p

  return false

port = normalizePort process.env.PORT or '3000'
app.set 'port', port

server = http.createServer app

server.listen port
server.on 'error', (err) ->
    unless err.syscall is 'listen'
        throw error

    bind = if typeof port is 'string' then "Pipe #{port}" else "Port #{port}"

    switch err.code
      when 'EACCES'
          console.error "#{bind} requires elevated privileges"
          process.exit 1
      when 'EADDRINUSE'
          console.error "#{bind} is already in use"
          process.exit 1
      else
          throw err

server.on 'listening', () ->
    addr = server.address()
    bind = if typeof addr is 'string' then "Pipe #{addr}" else "Port #{addr.port}"
    debug "Listening on #{bind}"


