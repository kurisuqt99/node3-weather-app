const request = require('postman-request')

const geocode = (address, callback) => {
    //street=12+Danbury&&state=CA&postalcode=92694&
    const url ='https://geocode.maps.co/search?city=' + encodeURIComponent(address) + '&country=US'

    request({url, json: true}, (error, response) => {
        if (error) {
            //can put 'undefined' as 2nd arg, but not necessary
            callback('Unable to connect to location services!')
        } 
        else if (response.body === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body[0].lat,
                longitude: response.body[0].lon,
                location: response.body[0].display_name
            })
        }
        
    })
}

module.exports = geocode