const express = require('express')
const exphbs = require('express-handlebars')
const homeRoute = require('./routes/home')
const addRoute = require('./routes/add')
const courseRoute = require('./routes/courses')


const app = express()
 
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoute)
app.use('/add', addRoute)
app.use('/courses', courseRoute)

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')







const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
  
})