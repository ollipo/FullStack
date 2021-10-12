import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const Blog = ({ blog }) => {
	console.log('Blog')

	/* const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}
 */
	return (
		<ListGroup>
			<ListGroup.Item action variant="light"><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></ListGroup.Item>
		</ListGroup>
	)
}

export default Blog