import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from "./components/Persons"
import Filter from './components/Filter'
import personService from './services/person'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(e=> alert(`server not running`, e))
  }

  useEffect(hook, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,    
    }
    if(persons.some((person)=> person.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(personObject)
          .then(setMessage(`User ${newName} updated`))
          .catch(e=> {
            console.log(e)
            setError(true)
            setMessage(`Information of ${personObject.name} has already been deleted from server`)
            setPersons(persons.filter(person=> person.name !== personObject.name))
          })
      }
    }
    else {
    personService
      .add(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setMessage(`User ${personObject.name} added`)
      })
    }
    setTimeout(()=>{
      setMessage(null)
      setError(false)
    }, 4000)
    setNewName('')
    setNewNumber('')
  }

  const handleDeleteOf = (id) => {
    if(window.confirm('Confirm delete?')) {
    personService
    .deletePerson(id)
    .then(() => {
      setMessage('User deleted')
    })
    .catch(()=> {
      setError(true)
      setMessage('User does not exist')  
    })
    setPersons(persons.filter(person=> person.id !== id))
    setTimeout(() => {
      setMessage(null)
      setError(false)
    }, 4000)
  }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  } 

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }



  const personToShow = filter.length === 0 ? persons : persons.filter(person=>person.name.toLowerCase().includes(filter.toLowerCase()))
 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error}/>
      <Filter 
        filter={filter}
        handleFilter={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm 
        submit={addPerson}
        newName={newName}
        newNumber={newNumber}
        changeName={handleNameChange}
        changeNumber={handleNumberChange}/>
      <h2>Numbers</h2> 
      <Persons 
        key={persons.id} 
        persons={personToShow}
        handleDelete= {handleDeleteOf}/>
    </div>
  )
}




export default App