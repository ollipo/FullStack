import React from 'react'

const Comment = ({ comment }) => {
	console.log('Comment: ', comment)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		marginBottom: 5
	}

	return (
		<div style={blogStyle}>
			<li>{comment.comment}</li>
		</div>
	)
}

export default Comment