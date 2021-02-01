
const fortunes = [
  'Conquer your fears or they will conquer you ',
  'Rivers need springs.',
  'Do not fear what you do not know',
  'You will have a pleasant suprise',
  'Whenever possible, keep it simple',
]

const home = (req, res) => res.render('home')
const about = (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
  res.render('about', { fortune: randomFortune })
}

//custom 404 page
const notFound = (req, res) => res.render('404 - Not Found')

//custom 500 page
const serverError = (err, req, res, next) => {
  res.render('500 - Server error')
}

module.exports = {
  home, about, notFound, serverError
}