import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'


describe('<BlogForm />', () => {
	test('form calls event handler with right details', () => {
		const createBlog = jest.fn()

		const component = render(
			<BlogForm createBlog={createBlog} />
		)

		const title = component.container.querySelector('.title')
		const titleInput = title.querySelector('input')
		const author = component.container.querySelector('.author')
		const authorInput = author.querySelector('input')
		const url = component.container.querySelector('.url')
		const urlInput = url.querySelector('input')
		const form = component.container.querySelector('form')

		fireEvent.change(titleInput, {
			target: { value: 'testing of forms could be easier' }
		})
		fireEvent.change(authorInput, {
			target: { value: 'Moro Kolli' }
		})
		fireEvent.change(urlInput, {
			target: { value: 'www.hmm.fi' }
		})

		fireEvent.submit(form)

		expect(createBlog.mock.calls).toHaveLength(1)
		expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier' )
		expect(createBlog.mock.calls[0][0].author).toBe('Moro Kolli' )
		expect(createBlog.mock.calls[0][0].url).toBe('www.hmm.fi' )
	})
})