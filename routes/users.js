const router = require('express').Router()
const Restaurant = require('../models').Restaurant
const User = require('../models').User
module.exports = router
  .get('/', async (req, res) => {
    try {
      const rows = await Restaurant.findAll({
        attributes: ['name', 'address', 'latitude', 'longitude', 'teritory']
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
    }).catch(err=>{
      res.send(err);
    })
  })

  .get('/list', (req, res)=>{
    User.findAll({
      order:[['name', 'ASC']]
    })
    .then(dataUsers=>{
      res.render('users/users-list', {dataUsers})
    }).catch(err=>{
      res.send(err);
    })
  })

  .get('/edit/:id', (req, res)=>{
    let id = req.params.id;
    User.findById(id)
    .then(dataUser=>{
      // res.send(dataUser)
      res.render('users/users-edit', {dataUser})
    }).catch(err=>{
      res.send(err)
    })
  })

  .post('/edit/:id', (req, res)=>{
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

  .get('/delete/:id', (req, res)=>{
    let id = req.params.id
    User.destroy({where:{id:id}}).then(()=>{
      res.redirect('/users/list')
    }).catch(err=>{
      res.send(err)
    })
  })











//
