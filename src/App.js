import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')
  const [ submitMessage, setSubmitMessage ] = useState(null)
  const [ messageClass, setMessageClass ] = useState(true)

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
        const newObj = { ...person, number: newNumber }
        personService
          .update(person.id, newObj)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNewName('');
            setNewNumber('');
            setMessageClass(true)
            setSubmitMessage(
              `Updated ${returnedPerson.name}'s phone number`
            )
            setTimeout(() => {
              setSubmitMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessageClass(false)
            setPersons(persons.filter(n => n.name !== person.name))
            setSubmitMessage(
              `Information of ${person.name} has already been removed from server`
            )
            setTimeout(() => {
              setSubmitMessage(null)
            }, 5000)
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
          setMessageClass(true)
          setSubmitMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setSubmitMessage(null)
          }, 5000)
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
      <Notification message={submitMessage} messageClass={messageClass} />
      <Filter setNewFilter={setNewFilter} />
      <h3>Add a new</h3>
      <PersonForm submitPerson={submitPerson} setNewName={setNewName} setNewNumber={setNewNumber} newName={newName} newNumber={newNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} removePerson={removePerson} />
    </div>
  )
}

export default App