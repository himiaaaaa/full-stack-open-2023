import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios
    .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    .then(res => {
      console.log('response.data ', res.data[0])
      setCountry(res)
    })
    .catch(error => {
      setCountry(null)
    })
  },[name])

  console.log('country', country)

  return country
}

const Country = ({ country }) => {
  /* if (!country) {
    return null
  }  */

  //console.log('country.found', country.found)

  if (!country) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data[0].name.common} </h3>
      <div>capital {country.data[0].capital} </div>
      <div>population {country.data[0].population}</div> 
      <img src={country.data[0].flags.png} height='100' alt={`${country.data[0].flags.alt}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App