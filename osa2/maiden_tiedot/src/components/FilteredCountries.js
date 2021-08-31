import React from 'react'

//Filters countries by users filter values and maps them to the screen
//If only one country, shows basic data about the country
const FilteredCountries = ({ countries, filterName }) => {
    const filteredCountries = countries.filter(country => country.name.search(new RegExp(filterName, 'i')) > -1)
   
    if(filteredCountries.length === 1) {
        return (
            <div>
                {filteredCountries
                .map(country =>
                    <p key={country.name}>
                    <h1>{country.name}</h1>
                    <p>capital {country.capital}</p>
                    <p>population {country.population}</p>
                    <h2>Languages</h2>
                    <p>{country.languages
                    .map(language =>
                        <li>{language.name}</li>)}
                    </p>
                    <img 
                        src={country.flag} 
                        alt='flag of the country'
                        height='auto'
                        width='10%'
                    />           
                    </p>)}
            </div>
        )
    } if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
        return (
            <div>
                {filteredCountries
                .map(country =>
                    <p key={country.name}>
                    {country.name}
                    </p>)}
            </div>
        )
    } else {
        return []
    }
}

export default FilteredCountries