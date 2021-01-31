const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.type('text/plain')
  res.send('Yo yo yo')
})

app.get('/about', (req, res) => {
  console.log('req.query.balls', req.query.balls)
  res.type('text/plain')
  res.status(200).send(`About Yo yo yo ${req.query.balls}`)
})

//custom 404 page
app.use((req, res)=>{
  res.type('text/plain')
  res.status(404)
  res.send('404 - Not Found')
})

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