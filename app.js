const app = require('express')()
const bodyParser = require('body-parser')

const index = require('./routes/index')
const users = require('./routes/users')
const restaurants = require('./routes/restaurants')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/', index)
app.use('/users', users)
app.use('/restaurants', restaurants)

app.listen(3000, () => console.log('App started on port 3000'))