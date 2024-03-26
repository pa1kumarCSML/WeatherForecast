const apiKey = '9982cd33d6c044b188a72752240703'; // Replace with your actual API key

const searchBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const icon = document.querySelector('.icon');

searchBtn.addEventListener('click', getWeather);

function getWeather() {
    let cityName = searchBar.value;
    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`)
        .then(res => res.json())
        .then(data => {
            if (data.cod === '404') {
                alert('City not found');
                return;
            }
            displayWeather(data);
        });
}

function updateDefault() {
    city.textContent = `Weather in ?`;
    temp.textContent = ``;
    description.textContent = "";
    humidity.textContent = ``;
    wind.textContent = ``;
    icon.src = "https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2013/02/no-data.png";
}

function displayWeather(data) {
    if (!data.error) {
        city.textContent = `Weather in ${data.location.name + " | " + data.location.region + " | " + data.location.country}`;
        temp.textContent = `${data.current.temp_c}°C`;
        description.textContent = data.current.condition.text;
        humidity.textContent = `Humidity: ${data.current.humidity}%`;
        wind.textContent = `Wind speed: ${data.current.wind_kph} km/h`;
        icon.src = data.current.condition.icon;
        console.log(data.current.humidity, data.current.wind_kph)
    } else {
        updateDefault();
    }
}

updateDefault()
