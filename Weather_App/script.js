let inputField = document.getElementById("input");
const button = document.getElementById("myButton");
const card = document.querySelector(".card");
const reload = document.querySelector(".reload-icon");
const info = document.querySelector(".info");
const search = document.querySelector(".search");
const temp = document.querySelector(".temp");
const wind = document.querySelector(".speed");
const humid = document.querySelector(".moist");
const tempImg = document.querySelector(".temp-img");

// Add an event listener to the button
button.addEventListener("click", () => {
  // Get the value of the input field
  var city = inputField.value.trim(); // Trim whitespace for cleaner input

  // Log the value to the console
  console.log("Input Value:", city);

  if (city) {
    // Check if the input is not empty
    checkWeather(city);
    reload.style.display = "flex";
    search.style.display = "none"; // Hide the search input
    info.style.display = "flex"; // Show weather info
  } else {
    alert("Please enter a valid city name."); // Alert for invalid input
  }
});

async function checkWeather(city) {
  const api_key = "b32014a7ae928e95032b65eba5d3859a";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );
  const temprature = Math.round(weather_data.main.temp - 273.15);
  // console.log(temprature);
  temp.textContent = `${temprature}°C`;
  const humidity = weather_data.main.humidity;
  // console.log(humidity);
  humid.textContent = `${humidity}%`;
  const windSpeed = Math.round(weather_data.wind.speed * 1.60934);
  // console.log(windSpeed);
  wind.textContent = `${windSpeed}km/h`;
  // console.log(weather_data.weather[0].main);

  switch (weather_data.weather[0].main) {
    case "Clear":
      tempImg.src = "./img/clear.png";
      break;
    case "Clouds":
      tempImg.src = "./img/clouds.png";
      break;
    case "Drizzle":
      tempImg.src = "./img/drizzle.png";
      break;
    case "Mist":
      tempImg.src = "./img/mist.png";
      break;
    case "Haze":
      tempImg.src = "./img/mist.png";
      break;
    case "Rain":
      tempImg.src = "./img/rain.png";
      break;
    case "Snow":
      tempImg.src = "./img/snow.png";
      break;
    default:
      console.log("no-img");
      break;
  }

  console.log(weather_data);
}

function reloadPage() {
  location.reload(); // Reloads the current page
}
