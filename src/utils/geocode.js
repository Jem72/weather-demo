const request = require('request')

const geocode = (address, callback) => {
    let encAddress = encodeURIComponent(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encAddress}.json?access_token=pk.eyJ1IjoiamVtNzIiLCJhIjoiY2lvZWgwZDJqMDAyc3cxbHhiNGk2Mmw3OSJ9.nLTT-enhb4pIaUgDadkAcg&limit=1`

    request({url, json: true}, (error, {body} = {}) => {
        if (null === error) {
            const features = body.features
            if (features.length > 0) {
                callback(undefined, {
                    latitude: features[0].center[1],
                    longitude: features[0].center[0],
                    location: features[0].place_name
                })
            } else {
                callback('Unable to find this location', undefined)
            }
        } else {
            callback('Unable to connect to geocode service', undefined)
        }
    })
}


module.exports = geocode