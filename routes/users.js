const router = require('express').Router()
const Restaurant = require('../models').Restaurant
const User = require('../models').User
const CheckedIn = require('../models').CheckedIn
const cekLogin = require('../helper/cekLogin');

module.exports = router
  .get('/', cekLogin, async (req, res) => {
    try {
      let bool = true
      let lists

      if (req.query.territory) {
        bool = false
        lists = await Restaurant.findAll({
          where: {
            territory: req.query.territory
          },
          attributes: ['id', 'name', 'address']
        })
      }

      const rowsRestaurant = await Restaurant.findAll({
        attributes: ['name', 'address', 'territory', 'latitude', 'longitude']
      })

      const rowsUser = await User.findById(req.session.user_id, {
        attributes: ['id', 'name', 'email', 'password', 'role'],
        include: [{
          model: Restaurant,
          attributes: ['id', 'name', 'address', 'territory', 'latitude', 'longitude']
        }]
      })

      const checkedIn = await CheckedIn.findAll({
        where: {UserId: req.session.user_id},
        include: Restaurant,
        order: [['createdAt', 'DESC']]
      })

      res.render('users/users-home', {rowsRestaurant, rowsUser, checkedIn, lists, bool})
    } catch (err) {
      console.error(err)
    }
  })
  .get('/:id/checkin', async (req, res) => {
    try {
      const rowsRestaurant = await Restaurant.findAll({where: {territory: req.query.territory}})
      res.render('users/checkin-restaurants', {rowsRestaurant})
      res.send(rows)
    } catch (err) {
      console.error(err)
    }
  })
  .post('/:id/checkin', async (req, res) => {
    try {
      await CheckedIn.create({
        RestaurantId: req.body.restaurantId,
        UserId: req.params.id,
        details: req.body.details
      })
      res.redirect('/users')
    } catch (err) {
      console.error(err)
    }
  })
  .get('/most-visited', async (req, res) => {
    try {
      const rowsRestaurant = await Restaurant.findAll()
      const rowsCheckedIn = await CheckedIn.findAll()

      const total = rowsRestaurant.length
      const most = []
      for (let i = 0; i < total; i++) {
        const findMost = rowsCheckedIn.filter(restaurant => {
          return restaurant.RestaurantId === i + 1
        })
        most.push(findMost.length)
      }

      const sorted = []
      for (let i = 0; i < most.length; i++) {
        let current = most[i]
        let j = i
        while (j < most.length - 1) {
          if (current < most[j]) current = most[j]
          j++
        }
        if (current === most[i]) sorted.push(i+1)
      }

      const results = []
      for (let i = 0; i < most.length; i++) {
        results.push(await Restaurant.findById(i+1))
      }

      res.render('users/most-visited', {results})
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
      res.redirect('/login')
    }).catch(err=>{
      res.send(err);
    })
  })
  .get('/list', cekLogin, (req, res)=>{
    if (req.session.role == 'admin') {
      User.findAll({
        order:[['name', 'ASC']]
      })
      .then(dataUsers=>{
        res.render('users/users-list', {dataUsers, role:req.session.role})
      }).catch(err=>{
        res.send(err);
      })
    }else {
      res.redirect('/users')
    }
  })
  .get('/edit/:id', cekLogin, (req, res)=>{
    let id = req.params.id;
    User.findById(id)
    .then(dataUser => {
      res.render('users/users-edit', {dataUser})
    }).catch(err=>{
      res.send(err)
    })
  })
  .post('/edit/:id', cekLogin, (req, res)=>{
    let id = req.body.id
    let userInput = {
      name      : req.body.name,
      email     : req.body.email,
      password  : req.body.password,
      role      : req.body.role
    }

    User.update(userInput, {where : {id:id}})
    .then(()=>{
      res.redirect('/users/list')
    }).catch(err=>{
      res.send(err);
    })
  })
  .get('/delete/:id', cekLogin, (req, res)=>{
    let id = req.params.id
    User.destroy({where:{id:id}}).then(()=>{
      res.redirect('/users/list')
    }).catch(err=>{
      res.send(err)
    })
  })