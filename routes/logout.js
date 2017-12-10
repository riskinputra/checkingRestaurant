const router = require('express').Router()
module.exports = router
  .get('/', (req, res)=> {
    req.session.destroy();
    res.redirect("/login");
  });
