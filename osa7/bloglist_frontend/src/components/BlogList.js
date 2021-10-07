import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import { setNotification } from '../reducers/notificationReducer'
import { removeBlog, vote } from '../reducers/blogReducer'

const BlogList = () => {
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	const handleLike = async (id) => {
		const blogToLike = blogs.find(b => b.id === id)
		const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
		const auth = {
			headers: { Authorization: `bearer ${user.token}` }
		}
		dispatch(vote(likedBlog, auth))
		dispatch(setNotification(`you voted: ${likedBlog.title}`, 'success', 5))
	}

	const handleRemove = async (id) => {
		const blogToRemove = blogs.find(b => b.id === id)
		const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
		if (ok) {
			const auth = {
				headers: { Authorization: `bearer ${user.token}` }
			}
			dispatch(removeBlog(blogToRemove, auth))
			dispatch(setNotification(`you deleted: ${blogToRemove.title}`, 'error', 5))
		}
	}

	const byLikes = (b1, b2) => b2.likes - b1.likes
	return (
		<div>
			{blogs.sort(byLikes).map(blog =>
				<Blog
					key={blog.id}
					blog={blog}
					handleLike={handleLike}
					handleRemove={handleRemove}
					own={user.username===blog.user.username}
				/>
			)}
		</div>
	)
}

export default BlogList