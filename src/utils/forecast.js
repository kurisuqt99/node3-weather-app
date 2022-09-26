const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=0cd917318542b838ab88ad90645a76e9&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error, { body } = {}) => {
        if (error) {  // low-level errors
            //can put 'undefined' as 2nd arg, but not necessary
            callback('Unable to connect to weather service!')
        } 
        else if (body.error) { 
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            callback(undefined, "Today it is: " + body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " with " + body.current.precip + "% chance of rain.")
        }
        
    })
}

module.exports = forecast