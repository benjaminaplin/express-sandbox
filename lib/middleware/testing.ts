module.exports.testingMiddleware = (res, req, next) => {
  console.log(`processing request for ${req.req.originalUrl}`)
  // console.log(`processing request for ${req.body}`, req.sessionStore)
  next()
}

//  module.exports.stoppingMiddleware = (res, req, next) => {
//    console.log(`stopping request for ${req.req.originalUrl}`)
//    res.res.send('Thanks for playing')
//  }