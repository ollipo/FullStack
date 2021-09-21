import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  
    const user = {
        token: 'jokutoken',
        username: 'userusername',
        name: 'usernameoftheuser'
    }

    const blog = {
        title: 'Testing the rendering of the component',
        author: 'Moro Kolli',
        url: 'www.testi.fi',
        user: user,
        likes: 7
    }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  component.debug()

  const divTitle = component.container.querySelector('.initialRender')
  expect(divTitle).toHaveTextContent(
    'Testing the rendering of the component'
  )

  const divAuthor = component.container.querySelector('.initialRender')
  expect(divAuthor).toHaveTextContent(
    'Moro Kolli'
  )
  const divUrl = component.container.querySelector('.initialRender')
  expect(divUrl).not.toHaveTextContent(
    'www.testi.fi'
  )

  const divLikes = component.container.querySelector('.initialRender')
  expect(divLikes).not.toHaveTextContent(
    'like'
  )
  
})

/* test('clicking the button calls event handler once', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = jest.fn()

  const component = render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const button = component.getByText('make not important')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
}) */