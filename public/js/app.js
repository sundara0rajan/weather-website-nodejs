const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//set the values in for writing to the labels
messageOne.textContent = ''


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = searchElement.value
    console.log(location)

    messageOne.textContent = 'Checking.....'
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast.weather_description + data.forecast.temparature
            console.log(data.location)
            console.log(data.forecast.temparature)
        }      
    })
})

})