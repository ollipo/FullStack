import React from 'react'

const BlogInfo = ({ blog, handleLike, handleRemove, own }) => {
	console.log('BlogInfo')

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		marginBottom: 5
	}

	return (
		<div style={blogStyle}>
			<h2>{blog.title}</h2>
			<div>{blog.url}</div>
			<div>likes {blog.likes}
				<button onClick={() => handleLike(blog.id)}>like</button>
			</div>
			<div>added by {blog.user.name}</div>
			{own&&<button onClick={() => handleRemove(blog.id)}>remove</button>}
		</div>
	)
}

export default BlogInfo