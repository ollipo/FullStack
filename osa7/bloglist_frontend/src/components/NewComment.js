import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'

const NewComment = ({ blog }) => {
	console.log('NewComment')
	const [comment, setComment] = useState('')
	const dispatch = useDispatch()
	console.log('newComment: ', comment)
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		marginBottom: 5
	}

	const handleComment = async (event) => {
		event.preventDefault()
		console.log('commentedBlog in handle: ', comment)
		dispatch(createComment(comment, blog.id))
	}

	return (
		<div style={blogStyle}>
			<h3>comments:</h3>
			<form onSubmit={handleComment}>
				<div>
					<input
						id='comment'
						value={comment}
						onChange={({ target }) => setComment(target.value)}
					/>
					<button>comment</button>
				</div>
			</form>
		</div>
	)
}

export default NewComment