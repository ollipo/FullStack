import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

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
			<form onSubmit={handleNewBlog}>
				<div>
          author
					<input
						id='author'
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
          title
					<input
						id='title'
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
          url
					<input
						id='url'
						value={url}
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button id="create">create</button>
			</form>
		</div>
	)
}

export default NewBlog