let now = new Date();
function today() {
  let todaysDate = document.querySelector("#todays-date");
  let date = now.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  todaysDate.innerHTML = `${day}, ${month} ${date}, ${hour}:${minutes}`;
}

today();

function citySearch(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");
  let searchLocation = document.querySelector("#search-location");
  currentCity.innerHTML = `${searchLocation.value}`;

  let apiKey = "dd9bfc04723a4fa7fc45126ece1eea84";
  let unit = "imperial";
  let city = searchLocation.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let temp = response.data.main.temp;
  let cardMain = document.querySelector("#card-main");
  cardMain.innerHTML = `${Math.round(temp)}°`;
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

let form = document.querySelector("form");
form.addEventListener("submit", citySearch);

function setPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(givePosition);
}

function givePosition(position) {
  let apiKey = "dd9bfc04723a4fa7fc45126ece1eea84";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemp);
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", setPosition);
