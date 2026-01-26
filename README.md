# Weather App

A responsive weather application built with HTML, CSS, and JavaScript, powered by WeatherAPI.com. Easily view real-time weather details and an 8-day forecast for any city worldwide with a clean UI, animated icons, and mobile-friendly responsiveness.

## Repository
https://github.com/BhanuPrakash-Guniganti/weather-app

## Features
- Search for any city worldwide  
- Current weather: temperature, humidity, wind, clouds, pressure, UV index  
- 8-day forecast with sunrise/sunset, min/max temps, icons, and descriptions  
- Celsius ↔ Fahrenheit toggle  
- Responsive layout for all screen sizes  
- Fast single-page experience  
- Powered by WeatherAPI.com

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/BhanuPrakash-Guniganti/weather-app.git
cd weather-app
```

### 2. Get a WeatherAPI Key
Sign up at: https://www.weatherapi.com/

### 3. Add your API Key
Open `script.js` and replace:
```javascript
const API_KEY = "YOUR_WEATHERAPI_KEY";
```

## Usage
- Enter a city in the search bar  
- Select Celsius or Fahrenheit  
- Press Enter or click the search button  
- View instant weather data + 8-day forecast  

## Project Structure
```
weather-app/
│── index.html
│── style.css
│── script.js
│── manifest.json
└── assets/
    └── logo.png

```

## Customization
- Modify `days=8` in the API URL for more/less forecast days  
- Update `.forecast-grid` in `style.css` for layout changes  
- Adjust colors, icons, and theme as desired  

## Troubleshooting
- Wrong API key → verify it in `script.js`  
- City not found → check spelling  
- No data → ensure internet is working  
- API limit reached → check WeatherAPI usage  

## Credits
- WeatherAPI.com — weather data  
- Font Awesome — icons  
- Bhanu Prakash Guniganti — developer  

## License
MIT License
