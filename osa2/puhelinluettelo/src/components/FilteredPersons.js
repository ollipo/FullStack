import React from 'react'

//Filters persons by users input values and maps them to the screen
const FilteredPersons = ({ persons, filterName, handleDelete }) => {
    console.log('FilteredPersons: ', persons)
    return (
        <div>
            {persons.filter(person => person.name.search(new RegExp(filterName, 'i')) > -1)
                .map(person =>
                    <p key={person.id}>
                        {person.name} 
                        {person.number}
                        <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
                    </p>)}     
        </div>
    )
}

export default FilteredPersons