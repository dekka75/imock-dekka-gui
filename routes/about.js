// DESCRIPTION:    Virtual services REST & SOAP
// MAINTAINER:     Didier Kimès <didier.kimes@gmail.com>

'use strict'

var debug = require('debug')('imock:gui:routes:about')
var express = require('express')
var request = require("request")
var router = express.Router()

/* About */
router.get('/', function (req, res, next) {
    res.set('Content-Type', 'text/html; charset=UTF-8')
    res.status(200)
    res.render('about', {
        message: 'about',
        tabs: 'no'
    })
})

module.exports = router