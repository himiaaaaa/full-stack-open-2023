import { useState } from 'react'

export const useField = (name) => {
    const[value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      name,
      value,
      onChange
    }
  }