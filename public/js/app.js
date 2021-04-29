const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = searchElement.value
    console.log(location)

    messageOne.textContent = 'Checking.....'

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast.weather_description
            console.log(data.location)
            console.log(data.forecast.weather_description)
        }      
    })
})

})