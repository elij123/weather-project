import AlertCard from "../components/AlertCard";

function Alert({alerts,timeZone}){
    if (alerts) {
        return (
            <>
                <div className="text-xl p-3 bg-amber-600 text-amber-50 font-bold max-w-100dvw">Weather Alert</div>
                {alerts.map((alert,index) => <AlertCard key={index} alert={alert} timeZone={timeZone} /> )}
            </>
        )
    } else {
        return null
    }
}

export default Alert;