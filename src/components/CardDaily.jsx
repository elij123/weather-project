import {parseTimeAndDate,MULTIPLE} from "./parseTimeAndDate";
import {default as d2d} from "degrees-to-direction";


function Rain({daily_rain}){
    if (daily_rain){
        return <div>Rain: {daily_rain} mm/h</div>
    } else {
        return <div>Rain: 0 mm/h</div>
    }
}

function Snow({daily_snow}){
    if (daily_snow){
        return <div>Snow: {daily_snow} mm/h</div>
    } else {
        return <div>Snow: 0 mm/h</div>
    }
}

function Gust({daily_gust}){
    if (daily_gust){
        return <div>Gust: {daily_gust} m/s</div>
    } else {
        return <div>Gust: 0 m/s</div>
    }
}

function CardDaily({daily,timeZone,icon}){
    const day = parseTimeAndDate(new Date(daily.dt*MULTIPLE),timeZone).day
    const month = parseTimeAndDate(new Date(daily.dt*MULTIPLE),timeZone).month
    const sunrise_time = parseTimeAndDate(new Date(daily.sunrise*MULTIPLE),timeZone).time
    const sunset_time = parseTimeAndDate(new Date(daily.sunset*MULTIPLE),timeZone).time
    const moonrise_time = parseTimeAndDate(new Date(daily.moonrise*MULTIPLE),timeZone).time
    const moonset_time = parseTimeAndDate(new Date(daily.moonset*MULTIPLE),timeZone).time
    return (
        <>
            <div className="border border-black rounded-3xl p-3 bg-[#fffffe] text-[#232946]">
                <div className="text-center text-nowrap">
                    <div>{day} {month}</div>
                    <img className="m-auto" src={icon[daily.weather[0].icon]} alt="sample" width="70" height="70" />
                    <div>Day: {daily.temp.day.toFixed()}°C</div>
                    <div>Evening: {daily.temp.eve.toFixed()}°C</div>
                    <div className="capitalize">{daily.weather[0].description}</div>
                    <div>Precip. {(daily.pop*100).toFixed()}%</div>  
                </div>
                <div>
                    <details className="border border-transparent rounded-lg w-max p-1">
                    <summary className="text-sm leading-6 font-medium">Expand</summary>
                    <div className="flex text-sm leading-6 rounded-lg bg-stone-200 px-2 py-1">
                        <div>
                            <div>Feels Like (Day): {daily.feels_like.day.toFixed()}°C</div>
                            <div>Sunrise: {sunrise_time}</div>
                            <div>Moonrise: {moonrise_time}</div>
                            <div>Humidity: {daily.humidity}%</div>
                            <div>UV index: {daily.uvi}</div>
                            <div>Pressure: {daily.pressure} hPa</div>
                            <div>Morning: {daily.temp.morn.toFixed()}°C Feels Like: {daily.feels_like.morn.toFixed()}°C</div>
                            <div>Wind: {daily.wind_speed} m/s ({daily.wind_deg}° {d2d(daily.wind_deg)})</div>
                            <div>Min: {daily.temp.min}°C</div>
                            <Snow daily_snow={daily.snow}/>
                        </div>
                        <div className="ml-3">
                            <div>Feels Like (Evening): {daily.feels_like.eve.toFixed()}°C</div>
                            <div>Sunset: {sunset_time}</div>
                            <div>Moonset: {moonset_time}</div>
                            <div>Dew Point: {daily.dew_point.toFixed()}°C</div>
                            <div>Cloudiness: {daily.clouds}%</div>
                            <Rain daily_rain={daily.rain}/>
                            <div>Night: {daily.temp.night.toFixed()}°C Feels Like: {daily.feels_like.night.toFixed()}°C</div>
                            <Gust daily_gust={daily.wind_gust}/>
                            <div>Max: {daily.temp.max}°C</div>
                        </div>
                    </div>
                    </details>
                </div>
            </div>
        </>
    )
}

export default CardDaily;