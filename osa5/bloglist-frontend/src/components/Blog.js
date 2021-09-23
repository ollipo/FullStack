import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, handleLikes }) => {
	const [visible, setVisible] = useState(false)

	const hideDetailsWhenVisible = { display: visible ? 'none' : '' }
	const showDetailsWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const handleRemove = async () => {
		if(window.confirm(`Remove blog ${blog.title} ${blog.author}?`))
			await blogService.remove(blog.id)
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const removeBtnStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		marginBottom: 5,
		backgroundColor: 'CornflowerBlue'
	}

	return (
		<div style={blogStyle}>
			<div style={hideDetailsWhenVisible} className='initialRender'>
				{blog.title}
				{blog.author}
				<button onClick={toggleVisibility}>view</button>
			</div>
			<div style={showDetailsWhenVisible} className='renderAfterViewButtonPressed'>
				{blog.title}
				{blog.author}
				<button onClick={toggleVisibility}>hide</button><br />
				{blog.url}<br />
				<span id='blogLikes'>{blog.likes}</span><button onClick={() => handleLikes(blog.id)}>like</button><br />
				{user.name}<br />
				{user.username === blog.user.username ?
					<div>
						<button onClick={handleRemove} style={removeBtnStyle} >remove</button>
					</div>:
					<div style={{ display: 'none' }}>
					</div>
				}
			</div>
		</div>

	)
}

export default Blog