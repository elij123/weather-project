import CardHourly from "../components/CardHourly"

function Hourly({hourly,timeZone, icon}){
    return (
        <>
            <div className="p-4 bg-transparent max-w-100dvw">
                <div className="p-2 bg-slate-900/30 font-semibold font-nunito text-3xl uppercase text-red-50 mb-4 w-max">Hourly Forecast</div>
                <div style={{scrollbarColor:"#536878 #003F88"}} className="bg-[#003F88] rounded-lg border border-black p-6 flex items-start gap-x-8 overflow-x-auto">
                    {hourly.slice(1,13).map( obj => <CardHourly key={obj.dt} hourly={obj} timeZone={timeZone} icon={icon}/> )}
                </div>
            </div>
        </>
    )
}

export default Hourly;