// DESCRIPTION:    Virtual services REST & SOAP
// MAINTAINER:     Didier Kimès <didier.kimes@gmail.com>

'use strict'

var debug = require('debug')('imock:gui:routes:viewer')
var express = require('express')
var request = require("request")
var _ = require('lodash')
var router = express.Router()

/* Viewer view */
router.get('/', function (req, res, next) {
    var server = req.app.locals.server
    var options = req.app.locals.options

    // Get groups list
    options.uri = server + '/api/responses/all'
    request(options, function (err, response, body) {
        // TODO: Error message
        if (err) {} else {

            res.set('Content-Type', 'text/html; charset=UTF-8')
            res.status(200)
            res.render('viewer', {
                name: 'iMock',
                title: 'Virtual Services',
                tabs: 'no'
            })
        }
    })
})

module.exports = router