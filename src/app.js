const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express()
// port that is only set on Heroku OR 3000 for localhost
const port = process.env.PORT || 3000

// DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, '../public')
// changed views path to templates.  
// express doesn't know where it is is we need need to 
// create the constant for it
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('view engine', 'hbs')
app.set('views', viewsPath) //point express to custom dir
hbs.registerPartials(partialsPath)



// SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath))

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// configures what server should do to return correct route
app.get('', (req, res) => {
    // render view
    // 1st arg match up with name of template in views folder
    // 2nd arg are objects u want the view to use
    res.render('index', {
        title: 'Weather', 
        name: 'Christine Alfano'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About', 
        name: 'Christine Alfano',
        summary: 'Sample site demonstrating NodeJS'
    }) 
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help', 
        message: 'Simple page displaying some help text.',
        name: "Christine Alfano"
    }) 
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'An address must be provided.'
        })
    } 

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
               return res.send({ error }) 
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

/*
// example using query string
app.get('/products', (req, res) => {
    // gets parameters from request string in URL browser
    // ex: ?search=games&rating=5
    if (!req.query.search) {
        // return stops function execution because can only
        // send request ONCE.
        return res.send({ 
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})
*/

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'PAGE NOT FOUND',
        name: 'Christine Alfano',
        errorMessage: "Help article not found"
    })
})

// match everything that hasn't been defined
// must be at end so that all defined pages/matches are seen first
app.get('*', (req, res) => {
    res.render('404', {
        title: 'PAGE NOT FOUND',
        name: 'Christine Alfano',
        errorMessage: "The page you are looking for cannot be found."
    })
})

// starts server up and listens on specific port
app.listen(port, () => {
    console.log('Server inizia su porto ' + port)
})