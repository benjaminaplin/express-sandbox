const env = process.env.NODE_ENV || "development"
//@ts-ignore
const credentials = require(`./.credentials.${env}`)
module.exports = { credentials }

// export {}