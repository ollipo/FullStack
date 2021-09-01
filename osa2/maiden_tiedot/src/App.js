import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilteredCountries from './components/FilteredCountries'
import FilterInput from './components/FilterInput'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ filterName, setFilterName ] = useState('')
  const [ countryWeather, setCountryWeather] = useState({})
  const [ countryName, setCountryName] = useState('Helsinki')

  console.log(countryWeather)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    axios
    .get(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${countryName}&aqi=no`)
    .then(response => {
        setCountryWeather(response.data)
        })
    }, [countryName])

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
        filterName={filterName}
        countryWeather={countryWeather}
        setCountryName={setCountryName}
        setFilterName={setFilterName} />
    </div>
  )

}

export default App
