import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => setPersons(initialPerson))
  }, [])

  const submitPerson = (e) => {
    e.preventDefault();
    const person = persons.filter(person => person.name === newName)[0]
    if (person) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log('ehhhh')
        const newObj = { ...person, number: newNumber }
        personService
          .update(person.id, newObj)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          })
      }
    } else {
      const newObj = { name: newName, number: newNumber };
      personService
        .create(newObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('');
          setNewNumber('');
        })
    }
  }

  const removePerson = id => (e) => {
    e.preventDefault();
    personService
      .remove(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setNewFilter={setNewFilter} />
      <h3>Add a new</h3>
      <PersonForm submitPerson={submitPerson} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} removePerson={removePerson} />
    </div>
  )
}

export default App