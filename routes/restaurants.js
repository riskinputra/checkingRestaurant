const router = require('express').Router()
const Restaurant = require('../models').Restaurant
const cekLogin = require('../helper/cekLogin');

module.exports = router
  .get('/', cekLogin, async (req, res) => {
    if (req.session.role == 'owner') {
      try {
        const rows = await Restaurant.findAll()
        res.render('restaurants/all-restaurants', {rows})
      } catch (err) {
        console.error(err)
      }
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
        territory: req.body.territory,
        latitude: latitude,
        longitude: longitude
      })

      res.redirect('/restaurants')
    } catch (err) {
      console.error(err)
    }
  })
  .get('/edit/:id', async (req, res) => {
    try {
      const row = await Restaurant.findById(req.params.id)
      res.render('restaurants/edit-restaurant', {row})
    } catch (err) {
      console.error(err)
    }
  })
  .post('/edit/:id', async (req, res) => {
    try {
      const latitudeTemp = req.body.latlng.split(', ')[0].split('')
      latitudeTemp.shift()
      const latitude = latitudeTemp.join('')
      const longitudeTemp = req.body.latlng.split(', ')[1].split('')
      longitudeTemp.pop()
      const longitude = longitudeTemp.join('')

      await Restaurant.update({
        name: req.body.name,
        address: req.body.address,
        latitude: latitude,
        longitude: longitude
      }, {
        where: {id: req.params.id}
      })
      res.redirect('/restaurants')
    } catch (err) {
      console.error(err)
    }
  })
  .get('/delete/:id', async (req, res) => {
    try {
      await Restaurant.destroy({where: {id: req.params.id}})
      res.redirect('/restaurants')
    } catch (err) {
      console.error(err)
    }
  })
  .get('/detail/:id', async (req, res) => {
    try {
      const row = await Restaurant.findById(req.params.id, {
        attributes: ['name', 'address', 'territory']
      })
      res.send(row)
    } catch (err) {
      console.error(err)
    }
  })
