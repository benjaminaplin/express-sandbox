// email validation
// slightly modified version of the official W3C HTML5 email regex:
// https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
var VALID_EMAIL_REGEX = new RegExp('^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@' +
'[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
'(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$');

const fortunes = [
  'Conquer your fears or they will conquer you ',
  'Rivers need springs.',
  'Do not fear what you do not know',
  'You will have a pleasant suprise',
  'Whenever possible, keep it simple',
]

const home = (req, res) => {
  // res.cookie('monster', 'nom nom')
  // res.cookie('signed_monster', 'nom nom', { signed: true })
  if(req.session){
    req.session.userName = 'anonymous'
  }

  res.render('home')
}
const about = (req, res) => {
  // res.clearCookie('monster')
  const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
  res.render('about', { fortune: randomFortune })
}

//custom 404 page
const notFound = (req, res) => res.render('404')

//custom 500 page
const serverError = (err, req, res, next) => {
  console.log("🚀 ~ file: handlers.ts ~ line 27 ~ serverError ~ err", err.message)
  res.render('500')
}

const newsletter = {
  get: function(req, res){
    // we will learn about CSRF later...for now, we just
    // provide a dummy value
    res.render('newsletter', { csrf: 'CSRF token goes here' });
  },
  post: function(req, res){
    var name = req.body.name || '', email = req.body.email || '';
    // input validation
    if(!email.match(VALID_EMAIL_REGEX)) {
      // if(req.xhr) return res.json({ error: 'Invalid name email address.' });
      req.session.flash = {
        type: 'danger',
        intro: 'Validation error!',
        message: 'The email address you entered was not valid.',
      };
      return res.send({redirect: '/newsletter/archive'});
    } else {
      req.session.flash = {
        type: 'success',
        intro: 'Thank you!',
        message: 'You have now been signed up for the newsletter.',
      };
      return res.send({redirect: '/newsletter/archive'});
    }
  },
  archive: function(req, res){
    res.render('newsletter/archive');
  },
};
const contest = {
  get: function(req, res){
    res.render('vacation-photo-form');
  },
  thanks: function(req, res){
    res.render('vacation-photo-thank-you');
  }
};
const vacationPhtotContestProcess = (req, res, fields, files)  => {
  req.session.flash = {
    type: 'yay',
    intro: 'yayayaya',
    message: 'yay for you buddy'
  }
  res.redirect(303, '/contest/vacation-photo-thank-you')
}

module.exports = {
  home, about, notFound, serverError, newsletter, contest, vacationPhtotContestProcess
}