import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
let component

beforeEach(() => {
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

  component = render(
    <Blog blog={blog} user={user}/>
  )

})

test('renders initial content', () => {

  const div = component.container.querySelector('.initialRender')
  
  expect(div).not.toHaveStyle('display: none')

  expect(div).toHaveTextContent('Testing the rendering of the component')
  expect(div).toHaveTextContent('Moro Kolli')
  
  expect(div).not.toHaveTextContent('www.testi.fi')
  expect(div).not.toHaveTextContent('like')
  
})

test('renders content after clicking view button', () => {

  const div = component.container.querySelector('.renderAfterViewButtonPressed')
  
  expect(div).toHaveStyle('display: none')

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(div).not.toHaveStyle('display: none')
  
  expect(div).toHaveTextContent('www.testi.fi')
  expect(div).toHaveTextContent('like')
})

})