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
  const [ notification, setNotification ] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        console.log('person: ', person)
        const changedPerson = { ...person, number: newNumber }
        console.log('changedPersonId: ', changedPerson.id)
      
        personService
          .update(changedPerson.id, changedPerson, setErrorMessage)
          .then(response => {
            console.log('response: ', response)
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : changedPerson))
            setNotification(
              `Changed number of ${changedPerson.name}`
            )
            setTimeout(() => {
              setNotification(null)
            }, 3000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(
              `Information of '${changedPerson.name}' has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotification(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setNotification(null)
        }, 3000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setErrorMessage(
          `${error.response.data.error}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
    }
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.destroy(id)
      setPersons(persons.filter(n => n.id !== id))
      setNotification(
        `Deleted ${name}`
      )
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="notification">
        {message}
      </div>
    )
  }

  const ErrorMessage = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="errorMessage">
        {message}
      </div>
    )
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
      <Notification message={notification} />
      <ErrorMessage message={errorMessage} />
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
