// DESCRIPTION:    Virtual services REST & SOAP
// MAINTAINER:     Didier Kimès <didier.kimes@gmail.com>

var debug = require('debug')('imock:gui:routes:index')
var express = require('express')
var request = require("request")
var _ = require('lodash')
var router = express.Router()

/* Dashboard view */
router.get('/', function (req, res, next) {
    var server = req.app.locals.server
    var options = req.app.locals.options

    // Get groups list
    options.uri = server + '/api/services/all'
    request(options, function (err, response, body) {
        if (err) {} else {
            var groups = JSON.parse(body)
            var groupsList = _.uniq(_.map(groups, 'group'))
            var group = groupsList[0]

            // Group by group / campaign
            var servicesList = {};
            groups.forEach(function (currentService) {
                var group = currentService['group']
                var campaign = currentService['campaign']
                if (!servicesList[group]) {
                    servicesList[group] = []
                }
                if (!servicesList[group][campaign]) {
                    servicesList[group][campaign] = []
                }
                servicesList[group][campaign].push(currentService)
            })

            res.set('Content-Type', 'text/html; charset=UTF-8')
            res.status(200)
            res.render('index', {
                name: 'iMock',
                title: 'Virtual Services',
                active: group,
                groupsList: groupsList,
                servicesList: servicesList
            })
        }
    })
})

module.exports = router