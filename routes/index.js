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
    var color = ''
    var key = ''

    // Get groups list
    options.uri = server + '/api/services/all'
    request(options, function (err, response, body) {
        if (err) {} else {
            var groups = JSON.parse(body)
            var groupsList = _.uniq(_.map(groups, 'group'))
            var group = groupsList[0]

            // Cards color
            _.forEach(groups, function (value) {
                if (key != value.group + value.campaign) {
                    key = value.group + value.campaign
                    color = (color == 'mdl-color--indigo-50') ? 'mdl-color--orange-50' : 'mdl-color--indigo-50'
                }
                value.color = color
            })

            var servicesList = _.groupBy(groups, 'group')

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