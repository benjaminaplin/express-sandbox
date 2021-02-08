const config = require('./config')
const { Client } = require('pg')
const { connectionString } = config.credentials.postgres
const client = new Client({ connectionString })

const createScript = `
  CREATE TABLE IF NOT EXISTS = vacations (
    name varChar(200) NOT NULL,
    slug varChar(200) NOT NULL UNIQUE,
    category varChar(200),
    sku varChar(20),
    price money,
    tags jsonb,
    description text,
    locationSearch varChar(100) NT NULL,
    location_lat double precision,
    location_lng double precision,
  )`

const getCount = async client => {
  const { rows } = await client.query('SELECT COUNT(*) FROM VACATIONS')
  return rows[0].count
}

const seedVacations = async client => {
  const sql =`
    INSERT INTO vacations(
      name,
      slug,
      category,
      available
    ) VALUES ( $1, $2, $3)`

  await client.query(sql, [
    'value',
    'value',
    'value',
    'value',
    'value',
  ])

  client.connect().then(async () => {
    try {
      console.log('creating db schema')
      await client.query(createScript)
      const vacationCount = await getCount(client)
      if(vacationCount === 0){
        seedVacations(client)
      }

    } catch(err) {
      console.log("ERROR: could not initialize db")
      console.log("MESSAGE:", err.message)
    } finally {
      client.end()
    }
  })
}

