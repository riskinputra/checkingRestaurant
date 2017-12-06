const router = require('express').Router()

module.exports = router
  .get('/', (req, res) => {
    res.send('/home')
    // res.render('index')
  })
