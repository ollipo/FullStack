import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilteredCountries from './components/FilteredCountries'
import FilterInput from './components/FilterInput'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ filterName, setFilterName ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleNameFiltering = (event) => {
    setFilterName(event.target.value)
  }


  return (
    <div>
      find countries 
      <FilterInput 
        handleNameFiltering={handleNameFiltering} 
        filterName={filterName}
      />
      <FilteredCountries 
        countries={countries} 
        filterName={filterName} />
    </div>
  )

}

export default App
