// DESCRIPTION:    Virtual services REST & SOAP
// MAINTAINER:     Didier Kimès <didier.kimes@gmail.com>

'use strict'

var debug = require('debug')('imock:gui:routes:users')
var express = require('express')
var request = require("request")
var router = express.Router()

/* Log in */
router.get('/', function (req, res, next) {
    res.set('Content-Type', 'text/html; charset=UTF-8')
    res.status(200)
    res.render('users', {
        name: 'iMock',
        title: 'Virtual Services',
        search: false,
        tabs: false,
        message: 'login'
    })
})

module.exports = router