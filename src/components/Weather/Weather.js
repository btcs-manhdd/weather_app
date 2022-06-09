import { useState, useEffect, useRef } from 'react'
import API_WEATHER from '../../API.js'
import axios from 'axios';



function Item({icon, number, donvi}){

    return(
        <div className="d-flex flex-column mx-3 mt-2 item">
            <i className={`${icon}`}></i>
            <span>{`${number}(${donvi})`|| ''}</span>
        </div>
    )
}

function Weather() {


    const[city, setCity] = useState(localStorage.getItem('city') || 'Hanoi');
    const inputRef = useRef();
    const[dataWeather, setDataWeather] = useState(null);
    const[search, setSearch] = useState(false);
    const[day, setDay] = useState(true);
    const[date, setDate] = useState(null);

    useEffect(() => {
        const getData = async() => {
            try {
                const response = await axios.get(API_WEATHER(city));
                const data = await response.data;
                setDataWeather(data);

                const seconds = Math.floor(Date.now()) + data.timezone*1000;
                let day = new Date(seconds);
                let dayString = day.toLocaleString("en-US",{
                    timeZone: "UTC",
                });
                setDate(day.toUTCString());
                const time = dayString.slice(-2);
                setDay(time === "AM");


                localStorage.setItem('city', city);
            } catch (error) {
                console.log(error.message);
            }
        }
        getData()
    }, [search, city])

    const handleSearch = () => {
        const value = inputRef.current.value;
        if(value){
            setCity(value);
            setSearch(!search);
            inputRef.current.value = '';
        }
    }


    return ( 
        <div className="weather d-flex flex-column align-items-center text-center">
            <div className="input-group mb-3">
                <input className="form-control" placeholder="Search..." ref={inputRef}/>
                <div className="input-group-append">
                    <button className="btn btn-success" onClick={handleSearch}>Search</button>
                </div>
            </div>
            {dataWeather ?
            ( <div className='d-flex justify-content-center align-items-center flex-column'>
                    <div className="mt-5 position-relative">
                        <h2>{dataWeather.name}, {dataWeather.sys.country}</h2>
                        <h6 className='font-weight-light text-warning'>{dataWeather.weather[0].description.toUpperCase()}</h6>
                        <h5>{date}</h5>
                        {day ? 
                        (<i className="position-absolute fa-solid fa-sun"></i>):
                        <i className="position-absolute fa-solid fa-moon"></i>
                    }
                    </div>
                    <div className="mt-5 temp position-relative">
                        <span>{dataWeather.main.temp.toFixed()}</span>
                        <span className='temp-icon'>
                            <span className=''>o</span>C
                        </span>
                        <img className='position-absolute' 
                            src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${dataWeather.weather[0]["icon"]}.svg`}
                            alt="icon"
                        />
                    </div>
                    <div className="mt-5 d-flex list-item">
                        <Item icon="far fa-eye" number={dataWeather.visibility} donvi="m"/>
                        <Item icon="fa-solid fa-wind" number={dataWeather.wind.speed} donvi="m/s"/>
                        <Item icon="fa-solid fa-cloud-sun" number={dataWeather.main.humidity} donvi="%"/>
                    </div>
                </div>):
            <h3 className='mt-5'>Simple Weather App</h3>
            }
        </div>
     );
}

export default Weather;