console.log('Client side JS is loaded')

const weatherForm = document.querySelector("#search_location_form")
const searchElement = document.querySelector("#search_location_input")

const messageError = document.querySelector("#error_message")
const textLocation = document.querySelector("#location_text")
const textWeather = document.querySelector("#weather_text")
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = searchElement.value;
    messageError.style.visibility = "hidden"
    messageError.textContent = ""
    textLocation.style.visibility = "visible"
    textLocation.textContent = "Loading ....."
    textWeather.style.visibility = "hidden"
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageError.textContent = data.error;
                messageError.style.visibility = "visible"
                textLocation.style.visibility = "hidden"
                textWeather.style.visibility = "hidden"
                console.log('Error: ' + data.error)
            } else {
                textLocation.style.visibility = "visible"
                textWeather.style.visibility = "visible"
                textLocation.textContent = ""
                textWeather.textContent = ""


                if (data.weather) {
                    textWeather.textContent = data.weather.message
                    console.log('Weather: ' + data.weather.message)
                }
                if (data.location) {
                    textLocation.textContent = data.location.location
                    console.log('Location: ' + data.location.location)
                }
            }
        })
    })
})