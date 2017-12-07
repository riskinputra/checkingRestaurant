const router = require('express').Router()
module.exports = router
  // Logout endpoint
  .get('/', (req, res)=> {
    req.session.destroy();
    res.redirect("/login");
  });
