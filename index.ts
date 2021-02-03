import { HighlightSpanKind } from "typescript"

const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()
const handlers = require('./lib/handlers.ts')

const port = process.env.PORT || 3000

/* Configure public static assets */
app.use(express.static(`${__dirname}/public`))

/* Configure handlebars */
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
  section: function(name, options){
    if(!this._sections) this._sections = {}
    console.log('this._sections')
    this._sections[name] = options.fn(this)
    return null
  }
}))


app.set('view engine', 'handlebars')
app.get('/', handlers.home)
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
