import { useState } from 'react'

export const useField = (name) => {
    const[value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }

    const reset = (event) => {
      setValue('')
    }
  
    return {
      name,
      value,
      onChange,
      reset,
    }
  }

