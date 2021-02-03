type Locations = { [index: string]: any }[]

const getWeatherData = () => Promise.resolve([
    {
      location: {
        name: 'Portland',
        coordinates: { lat: 45.5154586, lng: -122.6793 }
      },
      forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
      iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
      weather: 'Overcast',
      temp: '54.1 F (12.3 C)',
    },
    {
      location: {
        name: 'Portland',
        coordinates: { lat: 45.5154586, lng: -122.6793 }
      },
      forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
      iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
      weather: 'Partly Cloudy',
      temp: '55.0 F (12.8 C)',
    },
    {
      location: {
        name: 'Portland',
        coordinates: { lat: 45.5154586, lng: -122.6793 }
      },
      forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
      iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
      weather: 'Light Rain',
      temp: '55.0 F (12.8 C)',
    }
  ])

const weatherMiddleWare = async (req, res, next) => {
  if(!res.locals.partials) res.locals.partials = {}
  console.log('res.locals', res.locals)
  res.locals.partials.weatherContext = await getWeatherData()
  next()
}

module.exports = weatherMiddleWare