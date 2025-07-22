import {parseTimeAndDate,MULTIPLE} from "./parseTimeAndDate";
import {default as d2d} from "degrees-to-direction";


function Rain({hourly_rain}){
    if (hourly_rain){
        return <div>Rain: {hourly_rain} mm/h</div>
    } else {
        return <div>Rain: 0 mm/h</div>
    }
}

function Snow({hourly_snow}){
    if (hourly_snow){
        return <div>Snow: {hourly_snow} mm/h</div>
    } else {
        return <div>Snow: 0 mm/h</div>
    }
}

function Gust({hourly_gust}){
    if (hourly_gust){
        return <div>Gust: {hourly_gust} m/s</div>
    } else {
        return <div>Gust: 0 m/s</div>
    }
}

function CardHourly({hourly,timeZone, icon}){
    const hourly_time = parseTimeAndDate(new Date(hourly.dt*MULTIPLE),timeZone).time
    return (
        <>
            <div className="border border-black rounded-3xl p-3 bg-[#fffffe] text-[#232946]">
                <div className="text-center text-nowrap">
                    <div>{hourly_time}</div>
                    <img className="m-auto" src={icon[hourly.weather[0].icon]} alt="sample" width="70" height="70" />
                    <div>{hourly.temp.toFixed()}°C</div>
                    <div className="capitalize">{hourly.weather[0].description}</div>
                    <div>Precip. {(hourly.pop*100).toFixed()}%</div> 
                </div>
                <div>
                    <details className="border border-transparent rounded-lg w-max p-1">
                    <summary className="text-sm leading-6 font-medium">Expand</summary>
                    <div className="flex text-sm leading-6 rounded-lg bg-stone-200 px-2 py-1">
                        <div>
                            <div>Feels Like: {hourly.feels_like.toFixed()}°C</div>
                            <div>Humidity: {hourly.humidity}%</div>
                            <div>UV index: {hourly.uvi}</div>
                            <div>Wind: {hourly.wind_speed} m/s ({hourly.wind_deg}° {d2d(hourly.wind_deg)})</div>
                            <div>Pressure: {hourly.pressure} hPa</div>
                            <Snow hourly_snow={hourly.snow?.["1h"]}/>
                        </div>
                        <div className="ml-3">
                            <div>Dew Point: {hourly.dew_point.toFixed()}°C</div>
                            <div>Cloudiness: {hourly.clouds}%</div>
                            <div>Visibility: {hourly.visibility} m</div>
                            <Gust hourly_gust={hourly.wind_gust}/>
                            <Rain hourly_rain={hourly.rain?.["1h"]}/>
                        </div>
                    </div>
                    </details>
                </div>
            </div>
        </>
    )
}

export default CardHourly