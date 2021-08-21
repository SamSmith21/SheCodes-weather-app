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

function displayForecast() {}

///////////////////

function showTemperature(response) {
  let descriptionElement = document.querySelector("#description");
  let temperature = Math.round(response.data.main.temp);
  let tempNew = document.querySelector("#tempNew");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.main.temp);

  descriptionElement.innerHTML = response.data.weather[0].description;
  tempNew.innerHTML = `${celsiusTemperature}°C`;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
