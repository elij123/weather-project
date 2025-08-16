const URL = "https://weather-project-api.onrender.com"
import weatherLogo from `${URL}/assets/openweather.jpg`

function Footer(){
    return (
        <>
            <div className="p-2 bg-[#00296B] text-red-50 max-w-100dvw">
                <div className="grid grid-cols-2">
                    <div className="ml-3">Elijah <a className="underline decoration-solid decoration-blue-500 text-blue-500" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>  <a className="underline decoration-solid decoration-blue-500 text-blue-500" href="https://opendatacommons.org/licenses/odbl/">ODbL</a></div>
                    <div className="mr-3 justify-self-end">Weather data provided by <a className="underline decoration-solid decoration-blue-500 text-blue-500" href="https://openweathermap.org/">OpenWeather</a><img className="ml-3 float-right" src={weatherLogo} alt="OpenWeatherMap Logo" width={110} height={110} /></div>
                </div>
            </div>
        </>
    )
}

export default Footer;