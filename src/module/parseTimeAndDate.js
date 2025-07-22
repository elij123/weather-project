export const MULTIPLE = 1000;

export const parseTimeAndDate = (dateObject,timeZone) => {
    return {
        day: new Intl.DateTimeFormat("en-IN",{day:"numeric",timeZone:timeZone}).format(dateObject),
        weekDay: new Intl.DateTimeFormat("en-IN",{weekday:"short",timeZone:timeZone}).format(dateObject),
        year: new Intl.DateTimeFormat("en-IN",{year:"numeric",timeZone:timeZone}).format(dateObject),
        month: new Intl.DateTimeFormat("en-IN",{month:"long",timeZone:timeZone}).format(dateObject),
        hour: new Intl.DateTimeFormat("en-IN",{hour:"numeric",timeZone:timeZone}).format(dateObject),
        hour24: new Intl.DateTimeFormat("en-IN",{hour:"numeric",hourCycle:"h23",timeZone:timeZone}).format(dateObject),
        time: new Intl.DateTimeFormat("en-IN",{hour:"2-digit",minute:"2-digit",timeZone:timeZone}).format(dateObject),
        timeZone: new Intl.DateTimeFormat(undefined,{timeZoneName: "shortGeneric",timeZone:timeZone}).format(dateObject).split(", ").at(1)
    }
}
