#!/usr/bin/env node

/*
 * @Author: Lucky 
 * @Date: 2017-05-01 19:09:03 
 * @Last Modified by: Lucky
 * @Last Modified time: 2017-05-01 21:41:33
 */

/**
 * module dependencies
 */
require('babel-core/register')
require('babel-polyfill')
const app = require('./app').default
const http = require('http')
const $ = require('./utils')
const config = $.config

// get port from environment and store in express
const port = normalizePort(process.env.PORT || config.ports[0])
app.set('port', port)

// create http server
const server = http.createServer(app)

// listen on provided port, on all net work interfaces
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

// normalize a port into a number, string or false
function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

// event listener for HTTP server 'error' event
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }
  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

// event listener for HTTP server 'listening' event
function onListening() {
  let addr = server.address()
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  $.debug('Listening on ' + bind)
}

module.exports = app