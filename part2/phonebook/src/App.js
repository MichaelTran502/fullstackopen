import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.filter(person =>
      person.name.toLowerCase() === newPerson.name.toLowerCase()
      ).length > 0) {
        const person = persons.find(n => n.name.toLowerCase() === newPerson.name.toLowerCase());
        if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
          personService
          .update(person.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson));
            setNotification(`Changed number for ${returnedPerson.name}`);
          })
            .catch(error => {
              setNotification(`Information of ${person.name} has already been removed from the server`)
            })
        }
    } else {
      personService.create(newPerson)
        .then(returnedPerson =>  {
          setPersons(persons.concat(returnedPerson));
          setNotification(`Added ${returnedPerson.name}`)
        })
      }
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setNewName('');
      setNewNumber('');
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
  
  const handleDelete = (id) => {
    const person = persons.find(n => n.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id)
        .then(deletedPerson => {
          console.log(deletedPerson)
          setPersons(persons.filter(n => n.id !== id))
        })
        .catch(error => {
          setNotification(`the person ${person.name} was already deleted from the server`)
          setPersons(persons.filter(n => n.id !== id))
        })
    }

    setTimeout(() => {
      setNotification(null);
    }, 5000)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
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
      <Persons persons={filteredPersons} deleteButton={handleDelete}/>
    </div>
  )
}

export default App
