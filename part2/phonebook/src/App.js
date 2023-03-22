import { useState, useEffect  } from 'react'
import personServices from './services/persons'

const Heading = ({text}) => {return (<h2>{text}</h2>)}

const Filter = ({text, value, handleNewChange}) => {
  return(
  <div>
    {text} <input value={value} onChange={handleNewChange}/>
  </div>
  )
}

const Part = ({text, value, handleNewChange}) => {
  return(
    <div>
        {text} <input value={value} onChange={handleNewChange}/>
    </div>
  )
}

const Button = ({type, text, handleNewChange}) => {
  return(
    <button type={type} onClick={handleNewChange} >{text}</button>
  )
}

const PersonForm = ({ onSubmit, newName, newNumber, handleNewName, handleNewNumber }) => {
    return (
      <form onSubmit={onSubmit}>
        <Part text='name:' value={newName} handleNewChange={handleNewName}/>
        <Part text='number:' value={newNumber} handleNewChange={handleNewNumber}/>
        <Button text='add' type="submit" />
      </form>
    )
}

const Persons = ({personAfterFilter}) => {
  return(
    <div >
      {personAfterFilter}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName,setFilterName] = useState('')
  const [changeMessage, setChangeMessage] = useState('')

  useEffect(() => {
    personServices
      .getAll()
      .then(initialResult => {
        setPersons(initialResult)
      })
  }, [])
     
  const addPerson = (event) => {
      event.preventDefault()
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      const checkName = persons.find(props => props.name.toLowerCase() === newPerson.name.toLowerCase())
      const changedPerson = { ...checkName, number:newNumber}

      if(checkName && checkName.number === newPerson.number){
        window.alert(`${newName} is already added to phonebook`)
      }
      else if(checkName && checkName.number !== newPerson.number){
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          
          personServices
          .updatePerson(checkName.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(n => n.id !== checkName.id? n : returnedPerson))
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setChangeMessage(`number of ${newName} is changed`)
            }, 5000)
          })
          .catch(error => {
            setChangeMessage(`Information of ${newName} has already been removed from server`)
          })
        }
      }
      else{
        personServices
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setChangeMessage(`Successfully added ${newName}`)
          setTimeout(() => {
          setChangeMessage(null)
        }, 5000)
        }) 
        .catch(error => {
          setChangeMessage(`[error] ${error.response.data.error}`)
        })
      }         
  }

  const deletePerson = id => {
    const person = persons.find(n => n.id === id)
    if(window.confirm(`Delete ${person.name} ?`))
    {
      personServices
      .getDeletePerson(id)
      setPersons(persons.filter(persons => persons.id !== id))
    }
    
  }

  const handleNewName = (event) => { setNewName(event.target.value) }

  const handleNewNumber = (event) => { setNewNumber(event.target.value) } 

  const handleNewFilter = (event) => { setFilterName(event.target.value) } 

  const filter = persons.map(props => props.name.toLowerCase().includes(filterName.toLowerCase()))?
  persons.filter(props => props.name.toLowerCase().includes(filterName.toLowerCase()))
  : persons

  const People = ({name, number, id}) => {
      return(
        <li>{name} {number} <Button text='delete' type="submit" handleNewChange={() =>  deletePerson(id)} /></li>
      )
  }

  const personAfterFilter = filter.map( props =>
    <People key={props.id} name={props.name} number={props.number} id={props.id} />
  ) 

  
  return (
    <div>
      <Heading text='Phonebook' />
      <Notification message={changeMessage} />
      <Filter text='filter shown with' value={filterName} handleNewChange={handleNewFilter} />
      <Heading text='add a new' />
      <PersonForm onSubmit={addPerson}
                  newName={newName} 
                  newNumber={newNumber} 
                  handleNewName={handleNewName} 
                  handleNewNumber={handleNewNumber}
                  />
      <Heading text='Numbers' />
      <Persons personAfterFilter={personAfterFilter} />
    </div>
  )
}

export default App

