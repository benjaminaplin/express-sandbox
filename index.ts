const express = require('express')
const multiparty = require('multiparty')
const morgan = require('morgan')
const fs = require('fs')
const expressHandlebars = require('express-handlebars')
const { credentials } = require('./config')
const app = express()
const bodyParser = require('body-parser')
const handlers = require('./lib/handlers.ts')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const flashMiddleware = require('./lib/middleware/flash')
const { testingMiddleware } = require('./lib/middleware/testing')
var errorhandler = require('errorhandler')
var notifier = require('node-notifier')
const port = process.env.PORT || 3000

const startServer = (port) => {
  if(app){
    app.listen(port, () => {
      console.log(`express started in ${app.get('env')} ` + `mode on http://lcalhost:${port}` + `: press Ctrl + C to terminate`)
    })
  }
}


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler({ log: errorNotification }))
}
switch(app.get('env')) {
  case 'development':
    app.use(morgan('dev'))
    break
  case 'production':
    const stream = fs.createWriteStream(__dirname + '/access.log',
    {flags: 'a'})
    app.use(morgan('combined', {stream }))
    break
}
function errorNotification (err, str, req) {
  var title = 'Error in ' + req.method + ' ' + req.url

  notifier.notify({
    title: title,
    message: str
  })
}
/*
  static middleware: Configure public static assets
  This can be linked multiple times, 
  specifying different directories
*/
const cluster = require('cluster')
app.use((req, res, next) => {
  if(cluster.isWorker){
    console.log(`Worker ${cluster.worker.id} received request`)
  }
  next()
})
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser(credentials.cookieSecret))
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: credentials.cookieSecret
}))
app.get('/fail', (req, res, err) => {
  process.nextTick(()=>{
    throw new Error('Nopey nope nope!')
  })
})
app.use(testingMiddleware)

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

process.on('uncaughtException', err => {
  // do any clean up here
  // close db connections, etc
  console.log('****** uncaught exception ******')
  process.exit(1)
})
// custom 500 page
app.use(handlers.serverError)


if (require.main === module) {
  // application run directly; start app server
  startServer(port)
} else {
  // application imported as a module via "require": export
  // function to create server
  module.exports = startServer
}
