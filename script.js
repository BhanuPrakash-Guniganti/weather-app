

const API_KEY = '91e833e08ff74b90a33162245251911'; 

const userLocation = document.getElementById('userLocation');
const converter = document.getElementById('converter');
const weatherIcon = document.querySelector('.weatherIcon');
const temperature = document.querySelector('.temperature');
const feelslike = document.querySelector('.feelslike');
const description = document.querySelector('.description');
const date = document.querySelector('.date');
const city = document.querySelector('.city');
const HValue = document.getElementById('HValue');
const WValue = document.getElementById('WValue');
const SRValue = document.getElementById('SRValue');
const SSValue = document.getElementById('SSValue');
const CValue = document.getElementById('CValue');
const UVValue = document.getElementById('UVValue');
const PValue = document.getElementById('PValue');
const Forecast = document.querySelector('.Forecast');

// Temperature converter (WeatherAPI returns °C and °F)
function TempConverter(temp) {
  if (converter.value === "celsius") {
    return `${Math.round(temp)}<span>°C</span>`;
  } else {
    let f = Math.round((temp * 9) / 5 + 32);
    return `${f}<span>°F</span>`;
  }
}

// Listen for converter changes
converter.addEventListener("change", () => {
  if (temperature.innerHTML) {
    let num = parseFloat(temperature.textContent);
    temperature.innerHTML = TempConverter(num);
  }
  if (feelslike.innerHTML) {
    let match = feelslike.textContent.match(/[\d\.]+/);
    if (match) {
      let num = parseFloat(match[0]);
      feelslike.innerHTML = `Feels like ${TempConverter(num)}`;
    }
  }
});

function findUserLocation() {
  if (!userLocation.value.trim()) {
    alert("Please enter a city");
    return;
  }
  Forecast.innerHTML = "";

  // WeatherAPI forecast: 7 days + current
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${userLocation.value}&days=8&aqi=no&alerts=no`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error.message);
        return;
      }
      // City, country
      city.innerHTML = `${data.location.name}, ${data.location.country}`;

      // Weather Icon, Temp, Feels Like, Description
      weatherIcon.style.backgroundImage = `url('${data.current.condition.icon}')`;
      temperature.innerHTML = TempConverter(data.current.temp_c);
      feelslike.innerHTML = `Feels like ${TempConverter(data.current.feelslike_c)}`;
      description.innerHTML = `${data.current.condition.text}`;
      date.innerHTML = data.location.localtime;

      // Highlights
      HValue.innerHTML = `${data.current.humidity} <span>%</span>`;
      WValue.innerHTML = `${data.current.wind_kph} <span>km/h</span>`;
      // No direct sunrise/sunset in "current", but forecast[0] has them:
      SRValue.innerHTML = data.forecast.forecastday[0].astro.sunrise;
      SSValue.innerHTML = data.forecast.forecastday[0].astro.sunset;
      CValue.innerHTML = `${data.current.cloud} <span>%</span>`;
      UVValue.innerHTML = data.current.uv;
      PValue.innerHTML = `${data.current.pressure_mb} <span>mb</span>`;

      // "This Week" forecast
      Forecast.innerHTML = "";
      data.forecast.forecastday.forEach(day => {
        const card = document.createElement("div");
        card.className = "forecast-card";
        card.innerHTML = `
          <div><b>${day.date}</b></div>
          <img src="${day.day.condition.icon}" alt="icon" />
          <div class="forecast-desc">${day.day.condition.text}</div>
          <div>
            <span>${TempConverter(day.day.mintemp_c)}</span> /
            <span>${TempConverter(day.day.maxtemp_c)}</span>
          </div>
          <div><small>Sunrise: ${day.astro.sunrise}</small></div>
          <div><small>Sunset: ${day.astro.sunset}</small></div>
        `;
        Forecast.appendChild(card);
      });
    })
    .catch(err => {
      alert("Network error getting weather data.");
      console.error(err);
    });
}
