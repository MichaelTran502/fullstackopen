import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.filter(person =>
      person.name.toLowerCase() === newPerson.name.toLowerCase()
      ).length > 0) {
        alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('')
    }
  }

  const handleNewName = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  }

  // Add numbers
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value);
  }

  // this has to be a constant, not function
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase()));
  


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={filter} handleSearch={handleNewFilter}/>
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
