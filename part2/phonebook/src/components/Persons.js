import React from 'react'
import Person from './Person'

const Persons = ({persons, deleteButton}) => {

  return (
    <div>
      {persons.map(person => 
        <Person key={person.name} person={person} deleteButton={deleteButton}/>
      )}
    </div>
  )
}

export default Persons