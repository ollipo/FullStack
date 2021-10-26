import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const AuthorForm = ({ authors, show, setPage }) => {
  const [name, setName] = useState('')
  const [setBornTo, setBornYear] = useState('')


  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    editAuthor({  variables: { name, setBornTo } })

    setName('')
    setBornYear('')
    setPage('authors')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
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