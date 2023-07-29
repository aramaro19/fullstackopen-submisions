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
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(e=> alert(`server not running`, e))
  }

  useEffect(hook, [])


  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some((e)=> e.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log('do update service')
        const personObject = persons.find(e => e.name === newName)
        personObject.number = newNumber
        console.log(personObject)
        personService
          .update(personObject)
        setErrorMessage(`User ${newName} updated`)
        setTimeout(()=>setErrorMessage(null), 4000)
        setNewName('')
        setNewNumber('')
      }
    }
    else {
    const personObject = {
      name: newName,
      number: newNumber,    
    }
    personService
      .add(personObject)
      .then(response => setPersons(persons.concat(response)))
      setErrorMessage(`User ${personObject.name} added`)
        setTimeout(()=>setErrorMessage(null), 4000)
    setNewName('')
    setNewNumber('')
    }
  }

  const handleDeleteOf = (id) => {
    if(window.confirm('Confirm delete?')) {
    personService
    .deletePerson(id)
    .then(() => {
      setPersons(persons.filter(person=> person.id !== id))})
    .catch(e=> alert(e))}
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
      <Notification message={errorMessage}/>
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