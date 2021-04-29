const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
// define config for express
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
// setup handlebars
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Gulgulappi',
        name: 'Sundar'
    })

})

app.get ('/about', (req,res)=> {
    res.render('about', {
        title : 'This is about SUndar',
        name : 'Sundara Rajan Subramoniam'
    })
})

app.get('/help', (req,res)=>{
    res.render ('help', {
        helptext : 'This is a message asking for help',
        title : 'This is a help page',
        name : 'This help is called Helpie Helga'
    }
    )}
)


app.get('/weather', (req, res)=> {
    if (!req.query.address){
        return res.send({
            error: 'Please provide a valid city for the weather'
        })

    }

    const address = req.query.address

    geocode(address,(error,{latitude,longitude,location}=0)=> {

        if (error) {
            return res.send({
                error: error
            })

        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if (error) {
                return res.send({
                    error: error
                })
    
            }

            return res.send ({
                location :location,
                forecast :forecastData
            })

        })

    })

})

app.get('/products', (req,res)=> {
    if(!req.query.search){
        return res.send({
            error: 'Please add a search query string'
        })
    }

    console.log(req.query.search)
    
    res.send({
        products: []
    })
})

app.get ('/help/*',(req, res)=> {
    res.render('404', {
        errortext : 'The help page you are looking for doesnt exist',
        title : 'Page not found',
        name : 'Sundara Rajan'

    })

})

app.get ('*',(req, res)=> {
    res.render('404', {
        errortext : 'The page you are looking for doesnt exist',
        title : 'Page not found',
        name : 'Sundara Rajan'

    })

})

app.listen (3000, ()=> {
    console.log('Server is up at port 3000')
})