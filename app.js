const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const index = require('./routes/index')
const users = require('./routes/users')
const login = require('./routes/login')
const logout = require('./routes/logout')
const restaurants = require('./routes/restaurants')

app.use(session({secret: "Shh, its a secret!"}));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// app.use(express.static('public'))
app.use('/', express.static('public'))
// app.use('/assets', express.static(path.join(__dirname, 'public')))

app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/', index)
app.use('/users', users)
app.use('/login', login)
app.use('/logout', logout)
app.use('/restaurants', restaurants)

app.listen(process.env.PORT || 3000, () => console.log('App started on port 3000'))
