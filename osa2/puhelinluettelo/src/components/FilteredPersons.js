import React from 'react'

//Filters persons by users input values and maps them to the screen
const FilteredPersons = ({ persons, filterName }) => {
    
    return (
        <div>
            {persons.filter(person => person.name.search(new RegExp(filterName, 'i')) > -1)
                .map(person =>
                <p key={person.name}>
                {person.name} {person.number}
                </p>)}     
        </div>
    )
}

export default FilteredPersons