import CardDaily from "../components/CardDaily";

function Daily({daily,timeZone,icon}){
    return (
        <>
            <div className="p-4 bg-transparent max-w-100dvw">
                <div className="p-2 bg-slate-900/30 font-semibold font-nunito text-3xl uppercase text-red-50 mb-4 w-max">8-Day Forecast</div>
                <div style={{scrollbarColor:"#536878 #003F88"}} className="bg-[#003F88] rounded-lg border border-black p-6 flex items-start overflow-x-auto gap-x-8">
                    {daily.slice(0,8).map( obj => <CardDaily key={obj.dt} daily={obj} timeZone={timeZone} icon={icon}/> )}
                </div>
            </div>
        </>
    )
}

export default Daily;