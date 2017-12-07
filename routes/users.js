const router = require('express').Router()
const Restaurant = require('../models').Restaurant
const User = require('../models').User
const cekLogin = require('../helper/cekLogin');

module.exports = router
  .get('/', cekLogin, async (req, res) => {
    try {
      let bool = true
      const lists = []

      if (req.query.territory) {
        bool = false
        lists.push(Restaurant.findAll({
          where: {
            territory: req.query.territory
          }
        }))
      }

      const rows = await Restaurant.findAll({
        attributes: ['name', 'address', 'territory', 'latitude', 'longitude']
      })

      res.render('users/users-home', {rows, lists: JSON.stringify(lists, null, 2), bool})
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
      // res.send('Not Have Permission')
    }
  })

  .get('/edit/:id', cekLogin, (req, res)=>{
    let id = req.params.id;
    User.findById(id)
    .then(dataUser=>{
      // res.send(dataUser)
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











//
