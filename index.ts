const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000

const fortunes = [
  'Conquer your fears or they will conquer you ',
  'Rivers need springs.',
  'Do not fear what you do not know',
  'You will have a pleasant suprise',
  'Whenever possible, keep it simple',
]

/* Configure public static assets */
app.use(express.static(__dirname + '/public'))

/* Configure handlebars */
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

/* Routes */
app.get('/', (req, res) => res.render('home'))
app.get('/about', (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
  res.render('about', { fortune: randomFortune })
})


//custom 404 page
app.use((req, res)=>{
  res.type('text/plain')
  res.status(404)
  res.send('404 - Not Found')
})

//custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.type('text/plain')
  res.status(500)
  res.send('500 - Server error')
})

app.listen(port, () => console.log(
  `Express started on http://localhost:${port} ` +
  `press Ctrl-C to terminate.`
))