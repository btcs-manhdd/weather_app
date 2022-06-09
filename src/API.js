
function API_WEATHER(city){
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d78fd1588e1b7c0c2813576ba183a667`
}
export default API_WEATHER