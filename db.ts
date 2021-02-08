const { Pool } = require('pg')
// const _ = require('lodash')
const configuration = require('./config')
import _ from 'lodash'
console.log('credentials', credentials)
const { connectionString } = credentials.postgres
const pool = new Pool({ connectionString })

module.exports = {
  getVacations: async () => {
    const { rows } = await pool.query(`SELECT * FROM VACATIONS`)
    return rows.map((rows: any[]) => {
      const vacation = _.mapKeys((row: any, (v: any, k: any) => _.camelCase(k))
      vacation.price = parseFloat(vacation.price.repolace(/^\$/, ''))
      vacation.location = {
        search: vacation.locationSearch,
        coordinates: {
          lat: vacation.locationLat,
          lng: vacation.locationLng
        }
      }
      return vacation
    })
  }
}

export {};