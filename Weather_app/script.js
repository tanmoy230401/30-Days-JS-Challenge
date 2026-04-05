const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");
const notFound = document.querySelector(".not-found");
const searchCity = document.querySelector(".search-city");

const weatherInfo = document.querySelector(".weather-info");
const countryTxt = document.querySelector(".country-txt");
const tempTxt = document.querySelector(".temp-txt");
const conditionTxt = document.querySelector(".condition-txt");
const humidityTxt = document.querySelector(".humidity-value-txt");
const windTxt = document.querySelector(".wind-value-txt");
const weatherSummaryImg = document.querySelector(".weather-summary-img");
const currentDateTxt = document.querySelector(".current-date-txt");
const forecastItemsContainer = document.querySelector(
  ".forecast-items-container",
);

const apiKey = "3097f9eace4548f8cca35e9ce3968a66";
searchBtn.addEventListener("click", () => {
  const cityName = cityInput.value.trim();
  if (cityName != "") {
    updateweatherInfo(cityName);
    cityInput.value = "";
    cityInput.blur();
  }
});

cityInput.addEventListener("keydown", (event) => {
  const cityName = cityInput.value.trim();
  if (event.key === "Enter" && cityInput.value.trim() !== "") {
    updateweatherInfo(cityName);
    cityInput.value = "";
    cityInput.blur();
  }
});
function getWeatherIcon(id) {
  console.log(id);
  if (id <= 232) return "thunderstorm.svg";
  else if (id <= 321) return "drizzle.svg";
  else if (id <= 531) return "rain.svg";
  else if (id <= 622) return "snow.svg";
  else if (id <= 781) return "atmosphere.svg";
  else if (id === 800) return "clear.svg";
  else return "clouds.svg";
}

function getCurrentDate() {
  const currentDate = new Date();
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return currentDate.toLocaleDateString("en-GB", options);
}

async function getFetchData(endPoint, cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${cityName}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl);
  return response.json();
}

async function updateweatherInfo(city) {
  const weatherData = await getFetchData("weather", city);

  if (weatherData.cod === "404") {
    showDisplaySection(notFound);
    return;
  }

  console.log(weatherData);

  const {
    name: country,
    main: { temp, humidity },
    weather: [{ id, main }],
    wind: { speed },
  } = weatherData;

  countryTxt.textContent = country;
  tempTxt.textContent = `${Math.round(temp)}°C`;
  conditionTxt.textContent = main;
  humidityTxt.textContent = `${humidity}%`;
  windTxt.textContent = `${speed} m/s`;

  currentDateTxt.textContent = getCurrentDate();
  weatherSummaryImg.src = `${getWeatherIcon(id)}`;

  await updateForecastInfo(city);
  showDisplaySection(weatherInfo);
}

async function updateForecastInfo(city) {
  const forecastData = await getFetchData("forecast", city);

  const timeTaken = "12:00:00";
  const todayDate = new Date().toISOString().split("T")[0];

  forecastItemsContainer.innerHTML = "";
  forecastData.list.forEach((forecastWeather) => {
    if (
      forecastWeather.dt_txt.includes(timeTaken) &&
      !forecastWeather.dt_txt.includes(todayDate)
    )
      updateforecastItems(forecastWeather);
  });
}

function updateforecastItems(weatherData) {
  console.log(weatherData);
  const {
    main: { temp },
    weather: [{ id }],
    dt_txt: date,
  } = weatherData;

  const forecastDate = new Date(date);
  const options = { weekday: "short", day: "2-digit", month: "short" };
  const formattedDate = forecastDate.toLocaleDateString("en-GB", options);

  const forecastItem = `
        <div class="forecast-item">
            <h5 class="forecast-item-date regular-txt">${formattedDate}</h5>
            <img src="${getWeatherIcon(id)}" class="forecast-item-img" />
            <h5 class="forecast-item-temp">${Math.round(temp)}°C</h5>
        </div>`;

  forecastItemsContainer.insertAdjacentHTML("beforeend", forecastItem);
}

function showDisplaySection(section) {
  [weatherInfo, searchCity, notFound].forEach(
    (sectionElement) => (sectionElement.style.display = "none"),
  );

  section.style.display = "flex";
}
