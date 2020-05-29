const express = require('express')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const homeRoute = require('./routes/home')
const cartRoute = require('./routes/card')
const addRoute = require('./routes/add')
const courseRoute = require('./routes/courses')
const path = require('path')
const mongoose = require('mongoose')


const app = express()
 
// const hbs = exphbs.create({
//   defaultLayout: 'main',
//   extname: '.hbs'
// })

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoute)
app.use('/add', addRoute)
app.use('/courses', courseRoute)
app.use('/card', cartRoute)

app.engine('hbs', exphbs({handlebars: allowInsecurePrototypeAccess(Handlebars),
  defaultLayout: 'main',
  extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', 'views')


const PORT = process.env.PORT || 3000

const start = async () => {
  try{
    const URL = 'mongodb+srv://yaroslavoz:HcWSDTEiaBIM10bZ@cluster0-uc9xe.mongodb.net/shop'
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => {
      console.log(` Server is running on port ${PORT}`);
      
    })
  } catch (e) {
    console.log(e);
  }
}

//HcWSDTEiaBIM10bZ

start()