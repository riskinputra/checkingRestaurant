const router = require('express').Router()
const User = require('../models').User
const bcrypt = require('bcrypt');

module.exports = router
  .get('/', (req, res)=>{
    if(req.session.loggedIn){
      // console.log('kesini');
      res.redirect('/users')
    } else {
      res.render('login', {msg:null})
    }
  })

  .post('/', (req, res)=>{
    // res.send(req.body)

    User.findOne({where:{
      email:req.body.email
    }}).then(user=>{
      bcrypt.compare(req.body.password, user.password)
      .then(result=>{
        if(result){
          req.session.loggedIn = true
          req.session.role = user.role
          req.session.id = user.id
          res.redirect('/users')
          // res.send(result)
        }else{
          res.render('login', {msg:null})
        }
      })
    })
  })
