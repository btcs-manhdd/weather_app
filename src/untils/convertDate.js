

export const getDateByTimeZone = (timezone) => {
    
    const seconds = Math.floor(Date.now()) + timezone*1000;
    let day = new Date(seconds);
    let dayString = day.toLocaleString("en-US",{
        timeZone: "UTC",
    });
    const time = dayString.slice(-2);
    return {
        dateString: day.toUTCString(),
        isDay: time === "AM" 
    }
}