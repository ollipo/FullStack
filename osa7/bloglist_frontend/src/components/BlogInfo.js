import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'

const BlogInfo = ({ blog, handleLike, handleRemove, own }) => {
	console.log('BlogInfo')

	/* const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		marginBottom: 5
	} */

	return (
		<ListGroup variant="flush">
			<ListGroup.Item variant="light"><h2>{blog.title}</h2></ListGroup.Item>
			<ListGroup.Item variant="light"><div>{blog.url}</div></ListGroup.Item>
			<ListGroup.Item variant="light">
				likes {blog.likes}
				<Button onClick={() => handleLike(blog.id)}>like</Button>
			</ListGroup.Item>
			<ListGroup.Item variant="light">added by {blog.user.name}</ListGroup.Item>
			<ListGroup.Item variant="light">{own&&<Button variant="outline-primary" onClick={() => handleRemove(blog.id)}>remove</Button>}</ListGroup.Item>
		</ListGroup>
	)
}

export default BlogInfo