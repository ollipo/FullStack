import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const Blog = ({ blog }) => {

	return (
		<ListGroup>
			<ListGroup.Item action variant="light"><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></ListGroup.Item>
		</ListGroup>
	)
}

export default Blog