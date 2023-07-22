import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([ { name: 'Arto Hellas', id: 0 } ]) 
  const [ newName, setNewName ] = useState('insert name here')

  const handleOnChange = (event) => {
    setNewName(event.target.value)
    console.log(newName)
  }

  const addName = (event) => {
    console.log(event)
    event.preventDefault()
    const personObject = {
      name: newName,
      id: persons.length + 1,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    console.log(newName)
    
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName} 
          onChange={handleOnChange}/>
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

const Person = ({person}) => <div>{person.name}</div>

export default App