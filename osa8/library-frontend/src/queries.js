import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    id
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query allBooks($genre: String) {
  allBooks (genre: $genre) {
    title
    published
    author
      {
        name
        id
        born
        bookCount
      }
    id
    genres
  }
}
`

export const USER = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    published
    id
    author {
      name
      id
      born
      bookCount
    }
    genres
  }
}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
      name
      born
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author
        {
          name
          id
          born
          bookCount
        }
      id
      genres
    }
  }
`