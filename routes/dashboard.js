// DESCRIPTION:    Virtual services REST & SOAP
// MAINTAINER:     Didier Kimès <didier.kimes@gmail.com>

'use strict'

var debug = require('debug')('imock:gui:routes:index')
var express = require('express')
var request = require("request")
var _ = require('lodash')
var router = express.Router()

/* Dashboard view */
router.get('/', function (req, res, next) {
    var server = req.app.locals.server
    var options = req.app.locals.options
    var color = 0
    var key = ''

    // Get groups list
    options.uri = server + '/api/services/all'
    request(options, function (err, response, body) {
        // TODO: Error message
        if (err) {} else {
            var groups = JSON.parse(body)
            var groupsList = _.uniq(_.map(groups, 'group'))
            var group = groupsList[0]

            // Add properties colors, ...
            _.forEach(groups, function (value) {
                if (key != value.group + value.campaign) {
                    key = value.group + value.campaign
                    color = (color == 0) ? 1 : 0
                }
                value.color = color
                value.inbound = value.path.match(/\/([A-Z-a-z-0-9-_]{3,})\/[A-Z-a-z-0-9-_]{3,}\/.*/)[1]
                value.outbound = value.path.match(/\/[A-Z-a-z-0-9-_]{3,}\/([A-Z-a-z-0-9-_]{3,})\/.*/)[1]
                value.path = value.path.match(/\/[A-Z-a-z-0-9-_]{3,}\/[A-Z-a-z-0-9-_]{3,}(\/.*)/)[1]
            })

            var servicesList = _.groupBy(groups, 'group')

            res.set('Content-Type', 'text/html; charset=UTF-8')
            res.status(200)
            res.render('dashboard', {
                name: 'iMock',
                title: 'Virtual Services',
                search: true,
                tabs: true,
                active: group,
                groupsList: groupsList,
                servicesList: servicesList
            })
        }
    })
})

module.exports = router