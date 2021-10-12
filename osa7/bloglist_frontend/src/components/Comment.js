import React from 'react'
import { ListGroup } from 'react-bootstrap'

const Comment = ({ comment }) => {
	console.log('Comment: ', comment)

	/* 	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		marginBottom: 5
	} */

	return (
		<ListGroup variant="flush">
			<ListGroup.Item variant="light">{comment.comment}</ListGroup.Item>
		</ListGroup>
	)
}

export default Comment