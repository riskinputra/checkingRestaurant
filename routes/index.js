const router = require('express').Router()
const Restaurant = require('../models').Restaurant
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBCz4uuvcIers4wkNU6ZAkJS9m6ln0IRH8',
  Promise
})

module.exports = router
  .get('/', (req, res) => {
    Restaurant.findAll({attributes: ['name', 'location']}).then(data => {
      const arr = data.map(dataLatLong => {
        return googleMapsClient.geocode({address: dataLatLong.location}).asPromise().then(response => {
          dataLatLong.lat = response.json.results[0].geometry.location.lat
          dataLatLong.lng = response.json.results[0].geometry.location.lng
          return dataLatLong
        }).catch(err => console.error(err))
      })

      Promise.all(arr).then(rows => {
        res.render('index', {rows})
      })
    })
  })