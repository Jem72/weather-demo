const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'James Howard'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        image: './images/demo.jpg',
        name: 'James Howard'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Please Help',
        message: 'This is some text for a help message',
        name: 'James Howard'
    })
})

const setupError = (message) => {
    return {error: message}
}

app.get('/weather', (req, res) => {
    let responseObject = setupError('Unknown Error')
    if (!req.query.address) {
        responseObject = setupError('You must provide a search address')
        res.send(responseObject)
    } else {
        let location = req.query.address
        geocode(location, (error, {latitude, longitude, location} = {}) => {
            if (undefined !== error) {
                res.send(setupError(error))
            }
            if ((undefined !== latitude) && (undefined !== longitude)) {
                forecast(latitude, longitude, (error, {weather_descriptions, weather_icons, temperature, feelslike} = {}) => {
                    if (undefined !== error) {
                        res.send(setupError(error))
                    } else if (weather_descriptions) {
                        let message = `The forecast is ${weather_descriptions[0]}. It is currently ${temperature} degrees out. `
                        message = `${message} It feels like ${feelslike} degrees out. `
                        let weather_icon = ''
                        if(weather_icons)
                        {
                            weather_icon = weather_icons[0];
                        }
                        console.log(location)
                        const weather = {
                            message: message,
                            description: weather_descriptions[0],
                            icon: weather_icon,
                            temperature,
                            feels_like: feelslike
                        }
                        const responseLocation = {latitude, longitude, location}

                        responseObject = {weather, location: responseLocation, address: req.query.address}
                        res.send(responseObject)
                    } else {
                        res.send(responseObject)
                    }
                })
            }
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    } else {
        res.send({
            products: {}
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('error_404', {
        title: 'Help Page not found',
        message: 'Please go back to help',
        name: 'James Howard'
    })

})

app.get('*', (req, res) => {
    res.render('error_404', {
        title: 'Page not found',
        message: 'Please go elsewhere',
        name: 'James Howard'
    })
})

app.listen(port, () => {
    console.log('Server Started on port ' + port)
})