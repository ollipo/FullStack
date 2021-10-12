import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import BlogInfo from './BlogInfo'
import Comment from './Comment'
import NewComment from './NewComment'
import { setNotification } from '../reducers/notificationReducer'
import { removeBlog, vote } from '../reducers/blogReducer'
import {
	useParams
} from 'react-router-dom'

const BlogList = () => {
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()
	const id = useParams().id
	const routeBlog = blogs.find(n => n.id === id)

	const handleLike = async (id) => {
		const blogToLike = blogs.find(b => b.id === id)
		const likedBlog = {
			...blogToLike,
			likes: blogToLike.likes + 1,
			user: blogToLike.user.id
		}
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

	if (routeBlog) {
		return (
			<div>
				<div>
					<BlogInfo
						key={routeBlog.id}
						blog={routeBlog}
						handleLike={handleLike}
						handleRemove={handleRemove}
						own={user.username===routeBlog.user.username}
					/>
				</div>
				<div>
					<NewComment
						key={routeBlog.id}
						blog={routeBlog}
					/>
				</div>
				<div>
					{routeBlog.comments.map(comment =>
						<Comment
							key={comment._id}
							comment={comment}
						/>
					)}
				</div>
			</div>
		)
	}

	return (
		<div>
			{blogs.sort(byLikes).map(blog =>
				<Blog
					key={blog.id}
					blog={blog}
				/>
			)}
		</div>
	)
}

export default BlogList