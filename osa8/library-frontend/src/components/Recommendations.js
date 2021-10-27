import React from 'react'
import { useQuery } from '@apollo/client'
import { USER } from '../queries'

const Recommendations = ({ books, show } ) => {
    
    const user = useQuery(USER)

    let filteredBooks
    if(user.data) {
        filteredBooks = books.filter(b => 
            b.genres.includes(user.data.me.favoriteGenre))
    }

    if (!show) {
        return null
    }

    return (
        <div>
        <h2>recommendations</h2>
        books in your favourite genre <strong>patterns</strong>
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
            {filteredBooks.map(a =>
                <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
  )
}

export default Recommendations