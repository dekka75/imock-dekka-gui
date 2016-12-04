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
    var date
    var path

    // Get groups list
    options.uri = server + '/api/rrp/all'
    request(options, function (err, response, body) {
        // TODO: Error message
        if (err) {} else {
            var rrpList = JSON.parse(body)

            // Add properties date, ...
            _.forEach(rrpList, function (value) {
                date = new Date(parseInt(value.start))
                value.date = date.toISOString().replace('T', ' ').replace('Z', ' ')
                value.path = value.path.match(/(\/[A-Z-a-z-0-9-_]{3,}\/[A-Z-a-z-0-9-_]{3,}\/[A-Z-a-z-0-9-_]{3,})\/.*/)[1]
            })

            var rrpList = _.sortBy(rrpList, 'date').reverse()

            res.set('Content-Type', 'text/html; charset=UTF-8')
            res.status(200)
            res.render('viewer', {
                name: 'iMock',
                title: 'Virtual Services',
                search: true,
                tabs: false,
                rrpList: rrpList
            })
        }
    })
})

module.exports = router