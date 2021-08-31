import React from 'react'

//Takes the users filter input and sets it to the filtername's state
const FilterInput = ({ handleNameFiltering, filterName }) => {
    console.log(filterName)
    return (
        <input 
            value={filterName}
            onChange={handleNameFiltering}
        />
    )
}

export default FilterInput