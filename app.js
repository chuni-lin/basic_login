const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const checkoutUser = require('./checkout_user')
const app = express()

app.listen(3000, () => {
  console.log(`Express is running on http://localhost:3000`)
})

//template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'apple',
  cookie: {
    maxAge: 30 * 1000 //30 秒後過期
  }
}))

// 如果有 session 就直接轉到歡迎頁面；沒有就到登入頁
app.get('/', (req, res) => {
  if (req.session.isLoggedIn) {
    res.render('dashboard', { userVerified: req.session.name })
  } else res.render('index')
})

// 表單驗證之後， 將登入成功者加入 session.name，失敗者顯示訊息
app.post('/login', (req, res) => {
  const input = req.body
  const userVerified = checkoutUser(input)
  if (userVerified) {
    req.session.name = userVerified
    req.session.isLoggedIn = true
    res.render('dashboard', { userVerified })
  } else res.render('index', { input })
})


// 登出
app.post('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})




