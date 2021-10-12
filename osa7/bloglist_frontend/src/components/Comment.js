import React from 'react'
import { ListGroup } from 'react-bootstrap'

const Comment = ({ comment }) => {

	return (
		<ListGroup variant="flush">
			<ListGroup.Item variant="light">{comment.comment}</ListGroup.Item>
		</ListGroup>
	)
}

export default Comment