import Current from './containers/Current.jsx';
import Alert from './containers/Alert.jsx';
import Hourly from './containers/Hourly.jsx';
import Daily from './containers/Daily.jsx';
import Footer from './containers/Footer.jsx';
import { useState } from 'react';
import { MULTIPLE,parseTimeAndDate } from './module/parseTimeAndDate.js';

const URL = "https://weather-project-api.onrender.com"

const morning = `${URL}/assets/morning.gif`
const afternoon = `${URL}/assets/afternoon.gif`
const evening = `${URL}/assets/sunset.gif`
const night = `${URL}/assets/night.gif`

const two_clouds = `${URL}/assets/two_clouds.svg`
const thunder = `${URL}/assets/thunder.svg`
const sun = `${URL}/assets/sun.svg`
const sun_rain = `${URL}/assets/sun_rain.svg`
const sun_cloudy = `${URL}/assets/sun_cloudy.svg`
const snow = `${URL}/assets/snow.svg`
const rain = `${URL}/assets/rain.svg`
const moon = `${URL}/assets/moon.svg`
const moon_rain = `${URL}/assets/moon_rain.svg`
const moon_cloud = `${URL}/assets/moon_cloudy.svg`
const haze = `${URL}/assets/haze.svg`
const cloud = `${URL}/assets/cloud.svg`

const initialData = await fetch(`https://weather-project-api.onrender.com/weather/data?lat=12.99&lon=80.17`,{mode:"cors"})
                    .then(res => {return res.json()})

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
