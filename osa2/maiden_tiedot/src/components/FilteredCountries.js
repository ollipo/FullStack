import React from 'react'

//Filters countries by users filter values or after show button pressed
//and maps them to the screen
//If only one country, shows basic data about the country
const FilteredCountries = ({ countries, countryWeather, setCountryName, filterName, setFilterName }) => {
    const filteredCountries = 
        countries
        .filter(country => country.name
        .search(new RegExp(filterName, 'i')) > -1)
    
    
    if(filteredCountries.length === 1) {
        setCountryName(filteredCountries[0].name)
        return (
            <div>
                {filteredCountries
                .map(country =>
                    <div key={country.alpha3Code}>
                        <h1>{country.name}</h1>
                        <p>capital {country.capital}</p>
                        <p>population {country.population}</p>
                        <h2>Languages</h2>
                        <p>
                        {country.languages.map(language =>
                            <li key={language.name}>{language.name}</li>)}
                        </p>
                        <img 
                            src={country.flag} 
                            alt='flag of the country'
                            height='auto'
                            width='10%'
                        />
                        <div>
                        <h2>Weather in {countryWeather.location.name}</h2>
                        <p>
                        <b>temperature: </b> {countryWeather.current.temp_c} celcius
                        </p>
                        <img
                        src={countryWeather.current.condition.icon}
                        alt='weather icons'
                        />
                        <p>
                        <b>wind: </b> {countryWeather.current.wind_kph} kph
                        direction {countryWeather.current.wind_dir}
                        </p>
                        </div>
                        
                    </div>)}
            </div>
        )
    } if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
        return (
            <div>
                {filteredCountries
                .map(country =>
                <p key={country.alpha3Code}>
                    {country.name}
                    <button onClick={() => setFilterName(country.name)}>
                        show
                    </button>
                </p>)}
                
            </div>
        )
    } if (filteredCountries.length > 10 && filterName.length > 0) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else {
        return []
    }
}

export default FilteredCountries