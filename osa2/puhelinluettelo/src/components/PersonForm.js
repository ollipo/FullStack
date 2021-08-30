import React from 'react'

//Takes users name and number input and adds them to the phonebook
const PersonForm = ({ 
    addName, 
    newName, 
    handleNameChange, 
    newNumber, 
    handleNumberChange }) => {

    return (
        <form onSubmit={addName}>
        <div>
          name: 
            <input
              value={newName}
              onChange={handleNameChange} 
            />
        </div>
        <div>
          number: 
            <input
              value={newNumber}
              onChange={handleNumberChange} 
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}


export default PersonForm