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

/*         
                .catch((error) => console.error("Weather Data Error:", error));

        })
        .catch((error) => console.error("Location Error:", error));
}
*/
