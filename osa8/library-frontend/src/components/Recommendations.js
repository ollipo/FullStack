import React, {useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { USER, ALL_BOOKS } from '../queries'

const Recommendations = ({ show } ) => {
    const user = useQuery(USER)
    const [getBooks, filteredBooks] = useLazyQuery(ALL_BOOKS)

    useEffect(() => {            
        if (user.data) {
            getBooks({ 
                variables: { 
                    genre: user.data.me.favoriteGenre 
                } 
            })
        }   
    }, [user, getBooks])

    /* let filteredBooks
    if(user.data) {
        filteredBooks = books.filter(b => 
            b.genres.includes(user.data.me.favoriteGenre))
    } */

    if (!show || !user.data) {
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
            {filteredBooks.data.allBooks.map(a =>
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