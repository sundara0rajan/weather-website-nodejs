const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cc67148914d9a09755ead2c37b766c46&query='+ longitude + ',' + latitude + '&units=f'
    //console.log (url)

    request ({uri : url, json :true}, (error, response)=> {

        if (error) {

            callback ('Unable to connect', undefined)
        } 
        else if(response.body.error) {
            callback ('No location found to get weather for ', undefined)

        } else {

            callback (undefined,{
                weather_description : response.body.current.weather_descriptions[0],
                temparature : response.body.current.temperature,
                feels_like : response.body.current.feelslike
            })
        }
    })

}

module.exports = forecast