import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = async (event) => {
		event.preventDefault()
		createBlog ({
			title: title,
			author: author,
			url: url
		})
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<form onSubmit={addBlog}>
				<div className='title'>
					title:
					<input
						type="text"
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div className='author'>
					author:
					<input
						type="text"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div className='url'>
					url:
					<input
						type="text"
						value={url}
						name="Url"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired
}

export default BlogForm