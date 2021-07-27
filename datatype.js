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

///////////////////

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempNew = document.querySelector("#tempNew");
  tempNew.innerHTML = `${temperature}°C`;
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
  let temperature = Math.round(response.data.main.temp);
  let tempNew = document.querySelector("#tempNew");
  tempNew.innerHTML = `${temperature}°C`;
}

function showPosition(position) {
  let cityNew = document.querySelector("h2");

  cityNew.innerHTML = `Your current location`;

  let longitude = position.coords.latitude;
  let latitude = position.coords.longitude;

  let apiKey = "6ae4e841169165189c06e3418b098390";
  let apiUrlLocal = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;

  axios.get(`${apiUrlLocal}&appid=${apiKey}`).then(showTemperature);
}
function clickButton() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let clickButtone = document.querySelector("#localButton");
clickButtone.addEventListener("click", clickButton);

/////////////////////

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempNew");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = `${Math.round((temperature * 9) / 5 + 32)}°F`;
}

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempNew");
  let temperatureCelsius = temperatureElement.innerHTML;
  temperatureElement.innerHTML = `${Math.round(temperatureCelsius - 32)}°C`;
}

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", convertToCelsius);
