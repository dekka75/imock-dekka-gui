// DESCRIPTION:    Virtual services REST & SOAP
// MAINTAINER:     Didier Kimès <didier.kimes@gmail.com>
// TO_RUN:         /home/node/nodejs DEBUG=mock:* npm start
// TO_DEBUG:       console.log(trace.inspect(response, {depth: 1, showHidden: false}))

var debug = require('debug')('imock:gui:app')
var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var routes = require('./routes/index')
var users = require('./routes/users')

var app = express()
app.disable('etag')

// Globals variables
app.locals.server = 'http://192.168.56.102:8080'
app.locals.options = {
    uri: '',
    method: 'GET',
    headers: 'application/json; charset=UTF-8',
    timeout: 60000, // Time out : 1 * 60 * 1000
    followRedirect: true
}

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
    //app.use('/public', express.static(path.join(__dirname, 'public')))
    //app.use('/public/material-design-lite', express.static(path.join(__dirname, 'node_modules/material-design-lite')))

app.use('/', routes)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found....')
    err.status = 404
    next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500)
        res.render('error', {
            message: err.message,
            error: err
        })
    })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: {}
    })
})

module.exports = app