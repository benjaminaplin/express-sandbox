const express = require('express')
const multiparty = require('multiparty')
const expressHandlebars = require('express-handlebars')
const { credentials } = require('./config')
const app = express()
const bodyParser = require('body-parser')
const handlers = require('./lib/handlers.ts')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const flashMiddleware = require('./lib/middleware/flash')

const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
/* Configure public static assets */
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser(credentials.cookieSecret))
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: credentials.cookieSecret
}))

/* Configure handlebars */
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
  helpers: {
    section: function(name, options){
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }
  }
}))

app.post('/contest/vacation-photo', (req, res)=>{
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    if(err){ return res.status(500).send({ error: err.message })}
    handlers.vacationPhtotContestProcess(req, res, fields, files)
  })
})

app.set('view engine', 'handlebars')
app.get('/', handlers.home)
app.get('/contest/vacation-photo-form', handlers.contest.get);
app.get('/contest/vacation-photo-thank-you', handlers.contest.thanks);
app.get('/about', handlers.about)

// custom 404 page
app.use(handlers.notFound)

// custom 500 page
app.use(handlers.serverError)

if (require.main === module) {
  app.listen(port, () => console.log(
    `Express started on http://localhost:${port} press Ctrl-C to terminate.`
  ))
} else {
  module.exports = app
}
