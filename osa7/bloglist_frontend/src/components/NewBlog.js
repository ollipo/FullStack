import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'

const NewBlog = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	const handleNewBlog = async (event) => {
		event.preventDefault()
		const auth = {
			headers: { Authorization: `bearer ${user.token}` }
		}
		dispatch(createBlog({
			title, author, url
		}, auth))
		dispatch(setNotification(
			(`you added blog: ${title}`),
			'success',
			5
		))
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<h2>create new</h2>
			<Form onSubmit={handleNewBlog}>
				<Form.Group>
					<Form.Label>author</Form.Label>
					<Form.Control
						id='author'
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>

					<Form.Label>title</Form.Label>
					<Form.Control
						id='title'
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
					<Form.Label>url</Form.Label>
					<Form.Control
						id='url'
						value={url}
						onChange={({ target }) => setUrl(target.value)}
					/>
					<Button variant="primary" id="create">create</Button>
				</Form.Group>
			</Form>
		</div>
	)
}

export default NewBlog