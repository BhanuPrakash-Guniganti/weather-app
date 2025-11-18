const userLocation = document.getElementById("userLocation"),
  converter = document.getElementById("converter"),
  weatherIcon = document.querySelector(".weatherIcon"),
  temperature = document.querySelector(".temperature"),
  feelsLike = document.querySelector(".feelslike"),
  description = document.querySelector(".description"),
  date = document.querySelector(".date"),
  city = document.querySelector(".city"),
  HValue = document.querySelector(".HValue"),
  WValue = document.querySelector(".WValue"),
  SRValue = document.getElementById("SRValue"),
  SSValue = document.getElementById("SSValue"),
  CValue = document.querySelector(".CValue"),
  UVValue = document.querySelector(".UValue"),
  PValue = document.querySelector(".PValue"),
  Forecast = document.querySelector(".Forecast");

const WEATHER_API_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather?q=";
const WEATHER_DATA_ENDPOINT = "https://api.openweathermap.org/data/2.5/onecall?";
const API_KEY = "165fd8ca701ad0ed788a3f12ce7fbfa1";

/* ------------------------------------------------------------
   MAIN FUNCTION  
------------------------------------------------------------ */
function findUserLocation() {
  Forecast.innerHTML = "";

  fetch(
    WEATHER_API_ENDPOINT +
      userLocation.value +
      "&units=metric&appid=" +
      API_KEY
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod !== 200) {
        alert(data.message);
        return;
      }

      console.log(data);

      city.innerHTML = data.name + ", " + data.sys.country;

      weatherIcon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png)`;

      /* Fetch additional weather details */
      fetch(
        `${WEATHER_DATA_ENDPOINT}lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((fullData) => {
          console.log(fullData);

          /* LEFT PANEL DATA */
          temperature.innerHTML = Math.round(fullData.current.temp) + "°C";

          feelsLike.innerHTML =
            "Feels Like: " + Math.round(fullData.current.feels_like) + "°C";

          description.innerHTML =
            `<i class="fa-solid fa-cloud"></i> ` +
            fullData.current.weather[0].description;

          date.innerHTML = getLongFormat(
            fullData.current.dt,
            fullData.timezone_offset,
            {
              weekday: "long",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }
          );

          /* HIGHLIGHTS */
          HValue.innerHTML = Math.round(fullData.current.humidity) + "%";
          WValue.innerHTML = fullData.current.wind_speed + " m/s";

          SRValue.innerHTML = getLongFormat(
            fullData.current.sunrise,
            fullData.timezone_offset,
            { hour: "numeric", minute: "numeric", hour12: true }
          );

          SSValue.innerHTML = getLongFormat(
            fullData.current.sunset,
            fullData.timezone_offset,
            { hour: "numeric", minute: "numeric", hour12: true }
          );

          CValue.innerHTML = fullData.current.clouds + "%";
          UVValue.innerHTML = fullData.current.uvi;
          PValue.innerHTML = fullData.current.pressure + " hPa";

          /* WEEKLY FORECAST */
          fullData.daily.forEach((day) => {
            const options = {
              weekday: "long",
              month: "short",
              day: "numeric",
            };

            let dateString = getLongFormat(day.dt, fullData.timezone_offset, options)

            const div = document.createElement("div");
            div.innerHTML = `
                <h3>${dateString}</h3>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" />
                <p class="forecast-desc">${day.weather[0].description}</p>
                <span>
                    <strong>${Math.round(day.temp.min)}°C</strong> /
                    <strong>${Math.round(day.temp.max)}°C</strong>
                </span>
            `;
            Forecast.appendChild(div);
          });
        });
    });
}

/* ------------------------------------------------------------
   DATE & TIME HELPERS
------------------------------------------------------------ */
function formatUnix(dtValue, offset, options = {}) {
  const date = new Date((dtValue + offset) * 1000);
  return date.toLocaleString([], { timeZone: "UTC", ...options });
}

function getLongFormat(dtValue, offset, options) {
  return formatUnix(dtValue, offset, options);
}

/* ------------------------------------------------------------
   TEMPERATURE CONVERTER
------------------------------------------------------------ */
converter.addEventListener("change", () => {
  let currentTemp = parseFloat(temperature.innerText);

  if (converter.value === "fahrenheit") {
    temperature.innerHTML = Math.round((currentTemp * 9) / 5 + 32) + "°F";
  } else {
    temperature.innerHTML = Math.round(((currentTemp - 32) * 5) / 9) + "°C";
  }
});










/*

const userLocation = document.getElementById ('userLocation'),
  conventer = document.getElementById ('converter'),
  weatherIcon = document.querySelector ('.weatherIcon'),
  temperature = document.querySelector ('.temperature'),
  feelsLike = document.querySelector ('.feelsLike'),
  description = document.querySelector ('.description'),
  date = document.querySelector ('.date'),
  city = document.querySelector ('.city'),
  HValue = document.getElementById ('HValue'),
  WValue = document.getElementById ('WValue'),
  SRValue = document.getElementById ('SRValue'),
  SSValue = document.getElementById ('SSValue'),
  CValue = document.getElementById ('CValue'),
  UVValue = document.getElementById ('UVValue'),
  PValue = document.getElementById ('PValue'),
  Forecast = document.querySelector ('.Forecast');

WEATHER_API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?q=';

WEATHER_DATA_ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall?';

const API_KEY = '165fd8ca701ad0ed788a3f12ce7fbfa1';

function findUserLocation () {
  Forecast.innerHTML="";
  fetch (
    WEATHER_API_ENDPOINT + userLocation.value + '&units=metric&appid=' + API_KEY
  )
    //  fetch(WEATHER_API_ENDPOINT + userLocation.value)
    .then (response => response.json ())
    .then (data => {
      if (data.cod !== 200) {
        alert (data.message);
        return;
      }

      console.log (data);

      city.innerHTML = data.name + ', ' + data.sys.country;
      weatherIcon.computedStyleMap.background =
        'url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)';

      fetch (
        `${WEATHER_DATA_ENDPOINT}lat=${data.coord.lat}&lon=${data.coord.lon}`
      )
        .then (response => response.json ())
        .then (data => {
          console.log (data);

          temperature.innerHTML = data.current.temp;
          feelsLike.innerHTML = 'Feels Like' + data.current.feels_like;
          description.innerHTML =
            `<i class="fa-brands fa-cloudversify"></i> &nbsp` +
            data.current.weather[0].description;

          const options = {
            weekday: "long",
            month: "long",
            day: "numeric", 
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          };

          date.innerHTML =    'getLongFormateDateTime(data.current.dt, data.timezone_offset, options1)';
           HValue.innerHTML= Math.round (data.current.humidity) + '<span>%</span>';
          WValue.innerHTML =
            Math.round (data.current.wind_speed) + '<span>m/s</span>';
          const options1 = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          };
          SRValue.innerHTML =
            'getLongFormateDateTime(data.current.sunrise, data.timezone_offset, options1)';
          SSValue.innerHTML = 'getLongFormateDateTime(data.current.sunset, data.timezone_offset, options1)';
          CValue.innerHTML = data.current.clouds + '<span>%</span>';
          UVValue.innerHTML = data.current.uvi;
          PValue.innerHTML = data.current.pressure + '<span>hPa</span>';

          data.daily.forEach((weather) =>{
            const options={
              weekday: "long",
              month: "long",
              day: "numeric"
            }
            let daily = getLongFormateDateTime(weather.dt, 0, options).split("at");
    div.innerHTML= daily[0];      
     div.innerHTML+=`<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" />`   
     div.innerHTML+=`<p class="forecast-desc>${weather.weather[0].description}</p>`"`;
     div.innerHTML+=`<span><span>${TempConverter(weather.temp.min)}</span>&nbsp;&nbsp;<span>${TempConverter(weather.temp.max)}</span></span>`
            Forecast.append(div);

          })
        });
    });
}

function formatUnixTime (dtValue, offSet, options = {}) {
  const date = new Date ((dtValue + offSet) * 1000);
  return date.toLocaleTimeString ([], {timeZone: 'UTC', ...options});
}

function getLongFormateDateTime (dtValue, offSet, options) {
  return formatUnixTime (dtValue, offSet, options);
}


function TemConverter (temp) {
  let tempvalue=Math.round(temp);
  let message="";
  if(TemConverter.value=="°C"){
    message= tempValue+"<span>"+"\xBOC</span>";
  }
}else{
  let ctof= (tempvalue*9)/5+32;
    message=ctof+"<span>"+"\xBOF</span>";
}

*/
