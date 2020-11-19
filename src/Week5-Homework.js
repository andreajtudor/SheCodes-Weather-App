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

// Get current location
function getPosition(position) {
    let lat = Math.round(position.coords.latitude);
    let lon = Math.round(position.coords.longitude);
    let apiKey = "809f83a3c3f1056fc8bafdb178a866cc";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  
    axios.get(apiUrl).then(showWeather);
  }

navigator.geolocation.getCurrentPosition(getPosition);


function showWeather (response) {
    document.querySelector("#current-city").innerHTML = `${response.data.name}`;
    document.querySelector("#current-temp").innerHTML = Math.round((response.data.main.temp * 9) / 5 + 32);
    document.querySelector("#temp-1").innerHTML = `${Math.round((response.data.main.temp * 9) / 5 + 32)}°F `;
    document.querySelector("#other-info").innerHTML = `${response.data.weather[0].description} with a humidity of ${response.data.main.humidity}%`;
    
    let currentIconElement = document.querySelector("#current-weather-icon");
    currentIconElement.setAttribute("src", ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  
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

function searchCity(city) {
    let apiKey = "809f83a3c3f1056fc8bafdb178a866cc";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
  }

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }


let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);


searchCity("New York");