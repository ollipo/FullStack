import React, { useState } from 'react'

const Books = ({ books, show } ) => {
  const [genre, setGenre] = useState(null)
  const genreArrays = books.map(b =>
                        b.genres.map(g => g))
  const genresList = [].concat.apply([], genreArrays)
  let uniqueGenres = [...new Set(genresList)]
  const filteredBooks = books.filter(b => b.genres.includes(genre))

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {!genre && books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
          {genre && filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenre(null)}>all genres</button>
        {uniqueGenres.map(b =>
          <button 
            key={b} 
            onClick={() => setGenre(b)}>
              {b}
          </button>)}
      </div>
    </div>
  )
}

export default Books