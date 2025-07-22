import {parseTimeAndDate,MULTIPLE} from "../module/parseTimeAndDate";

function AlertCard({alert,timeZone}){
    const fromTime = parseTimeAndDate(new Date(alert.start * MULTIPLE),timeZone)
    const toTime = parseTimeAndDate(new Date(alert.end * MULTIPLE),timeZone)
    return (
        <>
            <div className="p-3 bg-amber-900 text-amber-50 max-w-100dvw">
                <div>Source: {alert.sender_name}</div>
                <div>Event: {alert.event}</div>
                <div>From: {fromTime.time} {fromTime.timeZone}, {fromTime.weekDay}, {fromTime.day}-{fromTime.month}-{fromTime.year}</div>
                <div>To: {toTime.time} {toTime.timeZone}, {toTime.weekDay}, {toTime.day}-{toTime.month}-{toTime.year}</div>
                <div>Description:</div>
                <div>{alert.description}</div>
            </div>
        </>
    )
}

export default AlertCard;