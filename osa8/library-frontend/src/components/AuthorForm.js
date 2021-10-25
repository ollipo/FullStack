import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const AuthorForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [setBornTo, setBornYear] = useState('')


  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  const submit = async (event) => {
    event.preventDefault()
    
    editAuthor({  variables: { name, setBornTo } })

    setName('')
    setBornYear('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
            
          <select 
            value={name} 
            onChange={({ target }) => setName(target.value)}>
                {authors.map(a =>
                    <option 
                        key={a.name} 
                        value={a.name}>
                            {a.name}
                    </option>
                )}
            </select>
        </div>
        <div>
          born
          <input
            value={setBornTo}
            onChange={({ target }) => setBornYear(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorForm