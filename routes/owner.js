const router = require('express').Router()

module.exports = router
  .get('/', (req, res) => {
    res.render('owner/owner-home')
  })
  .post('/', (req, res) => {
    const latitudeTemp = req.body.latlng.split(', ')[0].split('')
    latitudeTemp.shift()
    const latitude = latitudeTemp.join('')
    const longitudeTemp = req.body.latlng.split(', ')[1].split('')
    longitudeTemp.pop()
    const longitude = longitudeTemp.join('')

    const obj = {
      address: req.body.address,
      latitude: latitude,
      longitude: longitude
    }

    res.send(obj)
  })