import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilteredPersons from './components/FilteredPersons'
import FilterInput from './components/FilterInput'
import PersonForm from './components/PersonForm'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    if(persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNameFiltering = (event) => {
    setFilterName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with 
      <FilterInput 
        handleNameFiltering={handleNameFiltering} 
        filterName={filterName}
      />
      <h2>add a new</h2>
      <PersonForm 
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <FilteredPersons persons={persons} filterName={filterName} />
    </div>
  )

}

export default App
