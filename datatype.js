let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let dateNew = document.querySelector("#dateNew");

dateNew.innerHTML = `${day}, ${hour}:${minute}`;

/////////////////////

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="weather-forecast-date">
          ${formatDay(forecastDay.dt)}
          </div>
          
          <img src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="">
          <div class="weather-forecast-temperate">
            <span class="weather-forecast-temp-max">
            ${Math.round(forecastDay.temp.max)}° 
            </span>
            <span class="weather-forecast-temp-min">
            ${Math.round(forecastDay.temp.min)}°
            </span>
          </div>
        
        
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

///////////////////

function getForecast(coordinates) {
  let apiKey = "6ae4e841169165189c06e3418b098390";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let descriptionElement = document.querySelector("#description");
  let temperature = Math.round(response.data.main.temp);
  let tempNew = document.querySelector("#tempNew");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let cityNew = document.querySelector("h2");

  cityNew.innerHTML = response.data.name;

  celsiusTemperature = Math.round(response.data.main.temp);

  descriptionElement.innerHTML = response.data.weather[0].description;
  tempNew.innerHTML = `${celsiusTemperature}`;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function enterCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#citySearch");

  let cityNew = document.querySelector("h2");

  cityNew.innerHTML = `${searchInput.value}`;

  let city = `${searchInput.value}`;

  let apiKey = "6ae4e841169165189c06e3418b098390";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", enterCity);

/////////////////////

function showButtonTemp(response) {
  let tempNew = document.querySelector("#tempNew");
  tempNew.innerHTML = `${celsiusTemperature}°C`;
}

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;

  let apiKey = "6ae4e841169165189c06e3418b098390";
  let apiUrlLocal = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;

  axios.get(`${apiUrlLocal}&appid=${apiKey}`).then(showTemperature);
}
function clickButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let clickButtone = document.querySelector("#localButton");
clickButtone.addEventListener("click", clickButton);

/////////////////////

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempNew");
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = `${Math.round(
    (celsiusTemperature * 9) / 5 + 32
  )}`;
}

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempNew");
  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
  temperatureElement.innerHTML = `${celsiusTemperature}`;
}

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", convertToCelsius);

let celsiusTemperature = null;
