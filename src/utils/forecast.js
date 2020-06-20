const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const query = encodeURIComponent(latitude + ',' + longitude)
    const url = `http://api.weatherstack.com/current?access_key=2e1029b8a21d83020d2d300dbea28328&query=${query}&units=m`;
    console.log(url)
    request({url, json: true}, (error, {body} = {}) => {
        if (null === error) {
            if (!body.error) {
                callback(undefined, body.current)
            } else {
                callback('Error ' + body.error.code + ': ' + body.error.info, undefined)
            }
        } else {
            callback('Unable to connect to forecast service', undefined)
        }
    })
}

module.exports = forecast