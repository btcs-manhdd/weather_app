import { useState, useEffect, useRef } from 'react'
import  * as requestWeather from '../../untils/requestWeather';
import { getDateByTimeZone } from '../../untils/convertDate'
import Item from './Item';


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
                const data = await requestWeather.get('weather', {
                    params:{
                        q: city,
                        units: 'metric',
                        appid: 'd78fd1588e1b7c0c2813576ba183a667'
                    }
                });

                setDataWeather(data);

                const {dateString, isDay} = getDateByTimeZone(data.timezone);
                setDate(dateString);
                setDay(isDay);

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
            ( <div className='content d-flex justify-content-center align-items-center flex-column'>
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