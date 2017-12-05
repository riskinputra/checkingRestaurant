const router = require('express').Router()
const Restaurant = require('../models').Restaurant
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBCz4uuvcIers4wkNU6ZAkJS9m6ln0IRH8',
  Promise
})

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