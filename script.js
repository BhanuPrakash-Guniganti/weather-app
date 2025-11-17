const userLocation = document.getElementById("userLocation"),
    conventer = document.getElementById("converter"),
    weatherIcon = document.querySelector(".weatherIcon"),
    temperature = document.querySelector(".temperature"),
    feelsLike = document.querySelector(".feelsLike"),
    description = document.querySelector(".description"),
    date = document.querySelector(".date"),
    city = document.querySelector(".city"),
    HValue = document.getElementById("HValue"),
    WValue = document.getElementById("WValue"),
    SRValue = document.getElementById("SRValue"),
    SSValue = document.getElementById("SSValue"),
    CValue = document.getElementById("CValue"),
    UVValue = document.getElementById("UVValue"),
    PValue = document.getElementById("PValue"),
    Forecast = document.querySelector(".Forecast");


 WEATHER_API_ENDPOINT =
  "https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&units=metric&appid=165fd8ca701ad0ed788a3f12ce7fbfa1";

WEATHER_DATA_ENDPOINT =
  "https://api.openweathermap.org/data/2.5/onecall?lat=17.3850&lon=78.4867&units=metric&appid=165fd8ca701ad0ed788a3f12ce7fbfa1";

  /*
    WEATHER_API_ENDPOINT='https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&units=metric&appid=165fd8ca701ad0ed788a3f12ce7fbfa1';
    WEATHER_DATA_ENDPOINT='https://api.openweathermap.org/data/2.5onecal?appid=165fd8ca701ad0ed788a3f12ce7fbfa1&e';
*/
function findUserLocation() {
    fetch(WEATHER_API_ENDPOINT + userLocation.value)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod !== 200) {
                alert(data.message);
                return;
            }

            console.log(data);

            fetch(
                `${WEATHER_DATA_ENDPOINT}lat=${data.coord.lat}&lon=${data.coord.lon}`
            )
                .then((response) => response.json())
                .then((weatherData) => {
                    console.log(weatherData);
                })
                .catch((error) => console.error("Weather Data Error:", error));

        })
        .catch((error) => console.error("Location Error:", error));
}

/*
        fetch(WEATHER_DATA_ENDPOINT + '&lon=${data.coord.lon}&lat=${data.coord.lat}')
        .then((response) => response.json())
        console.log(data.coord.lon), data.coord.lat;
    })
    alert(1);
}
    */