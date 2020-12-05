import React from 'react'

const Persons = ({ person, removePerson }) => {
    const { number, name, id } = person
    return (
        <div>
            <p>{name} {number}</p>
            <button onClick={removePerson(id)}>delete</button>
        </div>                      
    )
}

export default Persons