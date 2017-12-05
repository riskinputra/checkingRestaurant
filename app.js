const app = require('express')()
const bodyParser = require('body-parser')

const index = require('./routes/index')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', index)

app.listen(3000, () => console.log('App started on port 3000'))