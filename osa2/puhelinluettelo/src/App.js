import React, { useState, useEffect } from 'react'
import FilteredPersons from './components/FilteredPersons'
import FilterInput from './components/FilterInput'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  console.log('alku: ', persons)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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
      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.destroy(id)
      setPersons(persons.filter(n => n.id !== id))
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
      <FilteredPersons 
        persons={persons} 
        filterName={filterName} 
        handleDelete={handleDelete}
      />
    </div>
  )

}

export default App
