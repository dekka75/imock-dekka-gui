// DESCRIPTION:    Virtual services REST & SOAP
// MAINTAINER:     Didier Kimès <didier.kimes@gmail.com>

var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'iMock'
    })
})

module.exports = router