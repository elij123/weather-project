import Current from './containers/Current.jsx';
import Alert from './containers/Alert.jsx';
import Hourly from './containers/Hourly.jsx';
import Daily from './containers/Daily.jsx';
import Footer from './containers/Footer.jsx';
import { useState } from 'react';
import { MULTIPLE,parseTimeAndDate } from './module/parseTimeAndDate.js';

import morning from "/src/assets/morning.gif"
import afternoon from "/src/assets/afternoon.gif"
import evening from "/src/assets/sunset.gif"
import night from "/src/assets/night.gif"

import two_clouds from "./assets/two_clouds.svg"
import thunder from "./assets/thunder.svg"
import sun from "./assets/sun.svg"
import sun_rain from "./assets/sun_rain.svg"
import sun_cloudy from "./assets/sun_cloudy.svg"
import snow from "./assets/snow.svg"
import rain from "./assets/rain.svg"
import moon from "./assets/moon.svg"
import moon_rain from "./assets/moon_rain.svg"
import moon_cloud from "./assets/moon_cloud.svg"
import haze from "./assets/haze.svg"
import cloud from "./assets/cloud.svg"

const initialData = await fetch(`https://weather-project-api.onrender.com/weather/data?lat=12.99&lon=80.17`,{mode:"cors"})
                    .then(res => {return res.json()}).catch(error => console.log(error))

const weather_icon = {
  "01d":sun,
  "01n":moon,
  "02d":sun_cloudy,
  "02n":moon_cloud,
  "03d":cloud,
  "03n":cloud,
  "04d":two_clouds,
  "04n":two_clouds,
  "09d":rain,
  "09n":rain,
  "10d":sun_rain,
  "10n":moon_rain,
  "11d":thunder,
  "11n":thunder,
  "13d":snow,
  "13n":snow,
  "50d":haze,
  "50n":haze
}

const background_time = (current_hour,sunrise_hour,sunset_hour) => {
    if (current_hour >= sunrise_hour && current_hour < 12){
      return morning
    } else if (current_hour >= 12 && current_hour < (sunset_hour)-1){
      return afternoon
    } else if (current_hour >= (sunset_hour-1) && current_hour < (sunset_hour+2)){
      return evening
    } else {
      return night
    }
  }

function App() {

  const [weatherData,setWeatherData] = useState(initialData)
  const [location, setLocation] = useState("Chennai,Tamil Nadu,India")

  const currentDate = new Date(weatherData.current.dt*MULTIPLE)
  const sunriseDate = new Date(weatherData.current.sunrise*MULTIPLE)
  const sunsetDate = new Date(weatherData.current.sunset*MULTIPLE)
  const current_hour = parseTimeAndDate(currentDate,weatherData.timezone).hour24;
  const sunrise_hour = parseTimeAndDate(sunriseDate,weatherData.timezone).hour24;
  const sunset_hour = parseTimeAndDate(sunsetDate,weatherData.timezone).hour24;

  return (
    <>
      <div style={{backgroundImage: `url(${background_time(current_hour,sunrise_hour,sunset_hour)})`, backgroundSize: "cover"}}>
        <Current changeLoc={setLocation} currentLoc={location} setWeatherData={setWeatherData} current={weatherData.current} timeZone={weatherData.timezone} icon={weather_icon}/>
        <Alert alerts={weatherData.alerts} timeZone={weatherData.timezone}/>
        <Hourly hourly={weatherData.hourly} timeZone={weatherData.timezone} icon={weather_icon}/>
        <Daily daily={weatherData.daily} timeZone={weatherData.timezone} icon={weather_icon}/>
      </div>
        <Footer />
    </>
  )
}

export default App;
