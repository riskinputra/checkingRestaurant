const router = require('express').Router()
const cekLogin = require('../helper/cekLogin');

module.exports = router
  .get('/', cekLogin, (req, res) => {
    res.send('/home')
    // res.render('index')
  })
