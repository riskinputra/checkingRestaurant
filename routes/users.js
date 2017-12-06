const router = require('express').Router()
const Restaurant = require('../models').Restaurant
const User = require('../models').User
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
  .get('/register', (req, res)=>{
    res.render('users/users-register')
  })
  .post('/register', (req, res)=>{
    let userInput = {
      name      : req.body.name,
      email     : req.body.email,
      password  : req.body.password,
      role      : req.body.role
    }
    User.create(userInput).then(()=>{
      res.redirect('/users')
    })
    // res.send(userInput)
  })
