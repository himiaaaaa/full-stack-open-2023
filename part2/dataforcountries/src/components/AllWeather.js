import { useEffect, useState } from 'react'
import axios from 'axios'

const AllWeather = ({result}) => {
    const[allWeather, setAllWeather] = useState(null)

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${result.capital[0]}&appid=${api_key}`)
          .then(response => {
            console.log(response.data)
            setAllWeather(response.data)
          })
    },[])

    if (allWeather === null) return null

    
    return(
        <div>
            <h2>{`weather in ${result.capital[0]}`}</h2>
            <p>{`tempeature ${(allWeather.main.temp - 273.5).toFixed(2)} Celcius`}</p>
            <img alt="weather icon" src={`http://openweathermap.org/img/wn/${allWeather.weather[0].icon}@2x.png`} />
            <p>{`wind ${allWeather.wind.speed} m/s`}</p> 
        </div>
    )
}



export default AllWeather