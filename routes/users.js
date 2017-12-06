const router = require('express').Router()
const Restaurant = require('../models').Restaurant

module.exports = router
  .get('/', async (req, res) => {
    try {
      const rows = await Restaurant.findAll({
        attributes: ['name', 'address', 'latitude', 'longitude']
      })

      res.render('users/users-home', {rows})
    } catch (err) {
      console.error(err)
    }
  })