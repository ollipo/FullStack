
import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import LoginForm from './components/LoginForm'
import AuthorForm from './components/AuthorForm'

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  const resultBooks = useQuery(ALL_BOOKS)

  useEffect(() => {
    const token = window.localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
    }, [])

    if (result.loading)  {
        return <div>loading authors...</div>
    }
    if (resultBooks.loading)  {
      return <div>loading books...</div>
    }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('books')
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
    if(!token) {
      return (
        <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>log in</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />
      <Authors
        show={page === 'authors'}
        authors={result.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books={resultBooks.data.allBooks}
      />
    </div>
      )
    }
  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('edit')}>edit author</button>
        <button onClick={() => logout()}>log out</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors
        show={page === 'authors'}
        authors={result.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books={resultBooks.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        setPage={setPage}
      />

      <AuthorForm
        show={page === 'edit'}
        authors={result.data.allAuthors}
        setPage={setPage}
      />
    </div>
  )
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

export default App