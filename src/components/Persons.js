import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, removePerson }) => {
    return (
        <div>
            {
                persons.map(person => {
                    if (person.name.toLowerCase().includes(filter.toLowerCase())) {
                        return <Person key={person.name} person={person} removePerson={removePerson} />
                    } else {
                        return null
                    }
                })
            }
        </div>
    )
}

export default Persons