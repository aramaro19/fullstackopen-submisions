import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([ { name: 'Arto Hellas', number:'00-123456' ,id: 0 } ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    console.log(newName)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    console.log(newNumber)
    
  }

  const addPerson = (event) => {
    console.log(event)
    event.preventDefault()

    if(persons.some((e)=> e.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
    const personObject = {
      name: newName,
      number: newNumber,      
      id: persons.length + 1,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName} 
          onChange={handleNameChange}/>
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.id} person={person}/>)}
    </div>
  )
}

const Person = ({person}) => <div>{person.name} {person.number}</div>

export default App