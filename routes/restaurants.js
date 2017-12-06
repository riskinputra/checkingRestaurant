const router = require('express').Router()
const Restaurant = require('../models').Restaurant

module.exports = router
  .get('/', async (req, res) => {
    try {
      const rows = await Restaurant.findAll()
      // res.send(rows)
      res.render('restaurants/all-restaurants', {rows})
    } catch (err) {
      console.error(err)
    }
  })
  .get('/add', (req, res) => {
    res.render('restaurants/add-restaurant')
  })
  .post('/add', async (req, res) => {
    try {
      const latitudeTemp = req.body.latlng.split(', ')[0].split('')
      latitudeTemp.shift()
      const latitude = latitudeTemp.join('')
      const longitudeTemp = req.body.latlng.split(', ')[1].split('')
      longitudeTemp.pop()
      const longitude = longitudeTemp.join('')

      await Restaurant.create({
        name: req.body.name,
        address: req.body.address,
        latitude: latitude,
        longitude: longitude
      })

      res.redirect('/restaurants')
    } catch (err) {
      console.error(err)
    }
  })