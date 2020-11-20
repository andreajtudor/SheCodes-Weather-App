// Display Current Date & Time
let now = new Date();

// Current date/time in header
let dateTime = document.querySelector("#date-time");
// Five-day forecast days
let dayOne = document.querySelector ("#day-1");
let dayTwo = document.querySelector ("#day-2");
let dayThree = document.querySelector ("#day-3");
let dayFour = document.querySelector ("#day-4");
let dayFive = document.querySelector ("#day-5");

  let days = [
    "Sunday", 
    "Monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday"
  ];

  let day = days[now.getDay()];
  let secondDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  let thirdDay = new Date(now.getTime() + 48 * 60 * 60 * 1000);
  let fourthDay = new Date(now.getTime() + 72 * 60 * 60 * 1000);
  let fifthDay = new Date(now.getTime() + 96 * 60 * 60 * 1000);

  let date = now.getDate();
  let months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May.",
    "June.",
    "July.",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec."
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  function formatAMPM(now) {
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
// Current date/time in header
dateTime.innerHTML = `${day}, ${month} ${date}, ${year} ${formatAMPM(new Date)}`;

// Five-day forecast days
dayOne.innerHTML =`${day.slice(0,3)}.`;
dayTwo.innerHTML = `${days[secondDay.getDay()].slice(0,3)}.`;
dayThree.innerHTML = `${days[thirdDay.getDay()].slice(0,3)}.`;
dayFour.innerHTML = `${days[fourthDay.getDay()].slice(0,3)}.`;
dayFive.innerHTML = `${days[fifthDay.getDay()].slice(0,3)}.`;

// Get Current Location on Page Load
function getPosition(position) {
    let lat = Math.round(position.coords.latitude);
    let lon = Math.round(position.coords.longitude);
    let apiKey = "809f83a3c3f1056fc8bafdb178a866cc";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  
    axios.get(apiUrl).then(showWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showForecast);
  }

navigator.geolocation.getCurrentPosition(getPosition);

// Current Weather
function showWeather (response) {
    document.querySelector("#current-city").innerHTML = `${response.data.name}`;
    document.querySelector("#current-temp").innerHTML = Math.round((response.data.main.temp * 9) / 5 + 32);
    document.querySelector("#hi-temp-1").innerHTML = `${Math.round((response.data.main.temp_max * 9) / 5 + 32)}°F `;
    document.querySelector("#forecast-description-1").innerHTML = response.data.weather[0].description;
    document.querySelector("#other-info").innerHTML = `${response.data.weather[0].description} with a humidity of ${response.data.main.humidity}%`;
    
    let currentIconElement = document.querySelector("#current-weather-icon");
    currentIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    let dayOneIconElement = document.querySelector("#icon-1");
    dayOneIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  
    // Convert Temp
    function convertTempC (event) {
       event.preventDefault();
       currentTemp = document.querySelector("#current-temp");
       currentTemp.innerHTML = Math.round(response.data.main.temp);
    }
  
    let celciusTemp = document.querySelector("#celsius-link");
        celciusTemp.addEventListener ("click", convertTempC);

    function convertTempF (event) {
       event.preventDefault();
       currentTemp = document.querySelector("#current-temp");
       currentTemp.innerHTML = Math.round((response.data.main.temp * 9) / 5 + 32);
    }

    let fahrenheitTemp = document.querySelector("#fahrenheit-link");
    fahrenheitTemp.addEventListener ("click", convertTempF);

}

// Forecast
function showForecast (response) {
  //console.log(response.data.list);

  let forecastElementTwo = document.querySelector("#day-2-forecast");
  let forecastTwo = response.data.list[6];
  
  forecastElementTwo.innerHTML = `
      <img class= "forecast-icon"id="icon-2" src="https://openweathermap.org/img/wn/${forecastTwo.weather[0].icon}@2x.png" alt="weather icon">
      <p class="high-temp" id="hi-temp-2">${Math.round((forecastTwo.main.temp_max * 9) / 5 + 32)}°F</p>
      <p class="forecast-description" id="forecast-description-2">${forecastTwo.weather[0].description}</p>
  `;

  let forecastElementThree = document.querySelector("#day-3-forecast");
  let forecastThree = response.data.list[14];
  
  forecastElementThree.innerHTML = `
      <img class= "forecast-icon"id="icon-3" src="https://openweathermap.org/img/wn/${forecastThree.weather[0].icon}@2x.png" alt="weather icon">
      <p class="high-temp" id="hi-temp-3">${Math.round((forecastThree.main.temp_max * 9) / 5 + 32)}°F</p>
      <p class="forecast-description" id="forecast-description-3">${forecastThree.weather[0].description}</p>
  `;

  let forecastElementFour = document.querySelector("#day-4-forecast");
  let forecastFour = response.data.list[22];
  
  forecastElementFour.innerHTML = `
      <img class= "forecast-icon"id="icon-4" src="https://openweathermap.org/img/wn/${forecastFour.weather[0].icon}@2x.png" alt="weather icon">
      <p class="high-temp" id="hi-temp-4">${Math.round((forecastFour.main.temp_max * 9) / 5 + 32)}°F</p>
      <p class="forecast-description" id="forecast-description-4">${forecastFour.weather[0].description}</p>
  `;

  let forecastElementFive = document.querySelector("#day-5-forecast");
  let forecastFive = response.data.list[30];
  
  forecastElementFive.innerHTML = `
      <img class= "forecast-icon"id="icon-5" src="https://openweathermap.org/img/wn/${forecastFive.weather[0].icon}@2x.png" alt="weather icon">
      <p class="high-temp" id="hi-temp-5">${Math.round((forecastFive.main.temp_max * 9) / 5 + 32)}°F</p>
      <p class="forecast-description" id="forecast-description-5">${forecastFive.weather[0].description}</p>
  `;
}



// Search Bar to API
function searchCity(city) {
    let apiKey = "809f83a3c3f1056fc8bafdb178a866cc";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    axios.get(apiUrl).then(showForecast);
  }

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }

let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);



// Get Lat, Long from Free-Form Text Search via HERE API

function getLatLon(response) {
  let lat = Math.round(response.data.items[0].position.lat);
  let lon = Math.round(response.data.items[0].position.lng);

  console.log(lat);
  console.log(lon);

 // let apiKey = "809f83a3c3f1056fc8bafdb178a866cc";
 // let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
 // axios.get(apiUrl).then(showForecast);
}

function getLatLong(location) {
  let apiKeyHere = "Q6NK3f66tnfI5_NUCSH6ejCXddMcmeUaMS7sUpO_VH4";
  let apiUrlHere = `https://geocode.search.hereapi.com/v1/geocode?q=${location}&apiKey=${apiKeyHere}`;
  axios.get(apiUrlHere).then(getLatLon);
}

function locaitonSubmit(event) {
  event.preventDefault();
  let location = document.querySelector("#city-input").value;
  getLatLong(location);
}
  
let locationForm = document.querySelector("#city-form");
locationForm.addEventListener("submit", locaitonSubmit);


searchCity("New York");
