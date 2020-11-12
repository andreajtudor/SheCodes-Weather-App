
// Display Current Date & Time

let now = new Date();

let dateTime = document.querySelector("#date-time");

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
  //let hour = now.getHours();
  //let minutes = now.getMinutes();

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
  
  //alert (formatAMPM(new Date));

dateTime.innerHTML = `${day}, ${month} ${date}, ${year} ${formatAMPM(new Date)}`;


// Weather Data Week 3

let weather = {
    "paris": {
      temp: 19.7,
      humidity: 80
    },
    "tokyo": {
      temp: 17.3,
      humidity: 50
    },
    "lisbon": {
      temp: 30.2,
      humidity: 20
    },
    "san francisco": {
      temp: 20.9,
      humidity: 100
    },
    "moscow": {
      temp: -5,
      humidity: 20
    }
  };



// Prompt City (Week 3)
//let city = prompt("Please enter your city.");

// Input City via Form (Week 4)

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  
  // Weather Data API Call (Week 5)

    let apiKey = "809f83a3c3f1056fc8bafdb178a866cc";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

    function showWeather (response) {
    // Display City
      let currentCity = document.querySelector("#current-city");
      currentCity.innerHTML = `${city.value} weather as of`;

      //city.value = city.value.toLowerCase();

      // NEED TO FIGURE OUT WHAT REPLACES weather[city.value]
      if (weather[city.value] !== undefined) {
        //let temperature = weather[city.value].temp;
        let temperature = response.data.main.temp;
        let description = response.data.weather[0].description;
        let humidity = response.data.main.humidity;
        let tempc = Math.round(temperature);
        let tempf = Math.round((temperature * 9) / 5 + 32);
  
      // Display Temp
        let currentTemp = document.querySelector("#current-temp");
        currentTemp.innerHTML = `${tempf}`;
  
      // Convert Temp
        function convertTempC (event) {
          event.preventDefault();
          currentTemp = document.querySelector("#current-temp");
          currentTemp.innerHTML = `${tempc}`;
        }
  
        let celciusTemp = document.querySelector("#celsius-link");
        celciusTemp.addEventListener ("click", convertTempC);

        function convertTempF (event) {
          event.preventDefault();
          currentTemp = document.querySelector("#current-temp");
          currentTemp.innerHTML = `${tempf}`;
        }

        let fahrenheitTemp = document.querySelector("#fahrenheit-link");
        fahrenheitTemp.addEventListener ("click", convertTempF);
  
      // Display Percip. & Other Info
        let otherInfo = document.querySelector("#other-info");
        otherInfo.innerHTML = `${description} with a humidity of ${humidity}%`;
    }
  
     // Alert full weather info (Week 3)
      //alert (`It is currently ${tempc}°C (${tempf}°F) in ${city} with a humidity of ${humidity}%`);
    }

    else { 
      alert (`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`);
    };
    
    
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}



let form = document.querySelector("#city-form");
form.addEventListener("submit", showCity);



