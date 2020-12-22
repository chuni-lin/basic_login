const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const checkoutUser = require('./checkout_user')
const app = express()

app.listen(3000, () => {
  console.log(`Express is running on http://localhost:3000`)
})

//template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//routes
app.get('/', (req, res) => {
  res.render('index')
})
app.post('/login', (req, res) => {
  const input = req.body
  const userVerified = checkoutUser(input)
  return userVerified.firstName ? res.render('dashboard', { userVerified }) : res.render('index', { input })
})



