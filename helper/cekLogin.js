function cekLoginHandler(req, res, next){
  if (req.session.loggedIn) {
    next()
  }else{
    res.redirect('/login')
    // next()
  }
}

module.exports = cekLoginHandler;
