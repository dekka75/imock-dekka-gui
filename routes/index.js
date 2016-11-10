// DESCRIPTION:    Virtual services REST & SOAP
// MAINTAINER:     Didier Kimès <didier.kimes@gmail.com>

var debug = require('debug')('imock:gui:routes:index')
var express = require('express')
var request = require("request")
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
    var server = req.app.locals.server
    var options = req.app.locals.options

    // GET Groups
    options.uri = server + '/api/groups'
    request(options, function (err, response, groups) {
        if (err) {} else {
            res.set('Content-Type', 'text/html; charset=UTF-8')
            res.status(200)
            res.render('index', {
                name: 'iMock',
                title: 'Virtual Services',
                groups: JSON.parse(groups)
            })
        }
    })
})

module.exports = router