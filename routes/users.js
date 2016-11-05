// DESCRIPTION:    Virtual services REST & SOAP
// MAINTAINER:     Didier Kimès <didier.kimes@gmail.com>

var debug = require('debug')('imock:gui:routes:users')
var express = require('express')
var request = require("request")
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
    var server = req.app.locals.server

    // GET Groups
    var options = {
        uri: server + '/api/groups',
        method: 'GET',
        headers: 'application/json; charset=UTF-8',
        timeout: 60000, // Time out : 1 * 60 * 1000
        followRedirect: true
    }

    // Call real service
    request(options, function (err, response, body) {
        if (err) {} else {
            res.set('Content-Type', 'text/xml; charset=UTF-8')
            res.status(200)
            res.render('users', {
                title: 'iMock 2016'
            })
        }
    })

})

module.exports = router