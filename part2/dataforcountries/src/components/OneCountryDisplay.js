import { useEffect, useState } from 'react'
import axios from 'axios'
import AllWeather from './AllWeather'

const OneCountryDisplay = ({result}) => {
    const keys = Object.keys(result.languages)
    const[allWeather, setAllWeather] = useState([])
    
    //console.log(keys)
    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${result.capital[0]}&appid=${api_key}`)
          .then(response => {
            console.log(response.data)
            setAllWeather(response.data)
          })
    },[]) 


    return(
      <div>
        <div>
            <h1>{result.name.common}</h1>
            <p>{result.capital[0]}</p>
            <p>{result.area}</p>
            <h3>languages:</h3>
            <ul>
                {keys.map(keys => <li>{result.languages[keys]}</li>)}
            </ul>
            <img src={result.flags.png} alt='flag' height='200' width='250' /> 
        </div>
        <AllWeather result={result}/>
      </div>
    )
  }

  export default OneCountryDisplay

  
