console.log('Client side JS is loaded')

const weatherForm = document.querySelector("#search_location_form")
const searchElement = document.querySelector("#search_location_input")

const messageError = document.querySelector("#error_message")
const textLocation = document.querySelector("#location_text")
const textWeather = document.querySelector("#weather_text")
const imageIcons = document.querySelector("#weather_icon")
const textHumidity = document.querySelector("#humidity_text")
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = searchElement.value;
    messageError.style.visibility = "hidden"
    messageError.textContent = ""
    textLocation.style.visibility = "visible"
    textLocation.textContent = "Loading ....."
    textWeather.style.visibility = "hidden"
    imageIcons.style.visibility = "hidden"
    textHumidity.style.visibility = "hidden"
    fetch(`/weather?address=${location}`).then((response) => {
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

                    if (data.weather.icon) {
                        imageIcons.src = data.weather.icon
                        imageIcons.style.visibility = "visible"
                    }

                    let extraText = "The current humidity is " + data.weather.humidity
                        + " and the current pressure is " + data.weather.pressure + " hectopascals"
                    textHumidity.textContent = extraText
                    textHumidity.style.visibility = "visible"
                }
                if (data.location) {
                    textLocation.textContent = data.location.location
                    console.log('Location: ' + data.location.location)
                }
            }
        })
    })
})