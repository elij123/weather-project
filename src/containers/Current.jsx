import PlaceSearch from "../components/PlaceSearch";
import {parseTimeAndDate,MULTIPLE} from "../module/parseTimeAndDate";
import {default as d2d} from "degrees-to-direction";

function Rain({current_rain}){
    if (current_rain){
        return <div>Rain: {current_rain} mm/h</div>
    } else {
        return <div>Rain: 0 mm/h</div>
    }
}

function Snow({current_snow}){
    if (current_snow){
        return <div>Snow: {current_snow} mm/h</div>
    } else {
        return <div>Snow: 0 mm/h</div>
    }
}

function Gust({current_gust}){
    if (current_gust){
        return <div>Gust: {current_gust} m/s</div>
    } else {
        return <div>Gust: 0 m/s</div>
    }
}

function Current({currentLoc, current, timeZone, icon, changeLoc, setWeatherData}){
    const currentDate = new Date(current.dt*MULTIPLE)
    const sunriseDate = new Date(current.sunrise*MULTIPLE)
    const sunsetDate = new Date(current.sunset*MULTIPLE)
    const date = parseTimeAndDate(currentDate,timeZone)
    const sunrise = parseTimeAndDate(sunriseDate,timeZone).time
    const sunset = parseTimeAndDate(sunsetDate,timeZone).time

    return (
        <>
            <div className="p-4 max-w-100dvw">
                <PlaceSearch changeLoc={changeLoc} setWeatherData={setWeatherData}/>
                <div className="bg-slate-900/70 w-max text-red-50 p-3 rounded-2xl">
                    <div className="flex mb-2">
                        <img src={icon[current.weather[0].icon]} alt="sample" width="90" height="90"/>
                        <div className="px-5 leading-5 pt-3">
                            <div className="text-5xl mb-2">{current.temp.toFixed()}°C</div>
                            <div className="capitalize text-lg font-semibold">{current.weather[0].description}</div>
                        </div>    
                    </div>
                    <div className="flex text-md">
                        <div className="mr-2">
                            <div>Feels Like: {current.feels_like.toFixed()}°C</div>
                            <div>Wind: {current.wind_speed} m/s ({current.wind_deg}° {d2d(current.wind_deg)})</div>
                            <div>UV Index: {current.uvi}</div>
                            <Snow current_snow={current.snow?.["1h"]}/>
                        </div>
                        <div className="ml-2">
                            <div>Humidity: {current.humidity}%</div>
                            <Gust current_gust={current.wind_gust}/>
                            <Rain current_rain={current.rain?.["1h"]}/>
                        </div>
                    </div>
                    <div>
                        <details className="border border-transparent rounded-lg w-max">
                        <summary className="text-sm leading-6 font-medium">Expand</summary>
                        <div className="flex text-sm leading-6 rounded-lg bg-red-50/15 px-2 py-1">
                            <div>
                                <div>Sunrise: {sunrise}</div>
                                <div>Sunset: {sunset}</div>
                                <div>Pressure: {current.pressure} hPa</div>
                            </div>
                            <div className="ml-3">
                                <div>Dew Point: {current.dew_point.toFixed()}°C</div>
                                <div>Cloudiness: {current.clouds}%</div>
                                <div>Visibility: {current.visibility} m</div>
                            </div>
                        </div>
                        </details>
                    </div>
                    <div className="text-sm my-1">
                        Last Updated: {date.time} {date.timeZone}, {date.weekDay}, {date.day}-{date.month}-{date.year}
                    </div>
                    <div className="text-sm my-1">
                        Location: {currentLoc}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Current;