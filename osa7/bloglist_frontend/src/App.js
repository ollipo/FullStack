import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import { setNotification } from './reducers/notificationReducer'
import loginService from './services/login'
import blogService from './services/blogs'
import storage from './utils/storage'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)

	const blogFormRef = React.createRef()

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])


	useEffect(() => {
		const user = storage.loadUser()
		setUser(user)
	}, [])

	const notifyWith = (message, type='success') => {
		dispatch(setNotification(
			message, type, 5))
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password
			})

			setUsername('')
			setPassword('')
			setUser(user)
			notifyWith(`${user.name} welcome back!`)
			storage.saveUser(user)
		} catch(exception) {
			notifyWith('wrong username/password', 'error')
		}
	}

	const handleLike = async (id) => {
		const blogToLike = blogs.find(b => b.id === id)
		const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
		await blogService.update(likedBlog)
		blogs.map(b => b.id === id ?  { ...blogToLike, likes: blogToLike.likes + 1 } : b)
	}

	const handleRemove = async (id) => {
		const blogToRemove = blogs.find(b => b.id === id)
		const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
		if (ok) {
			await blogService.remove(id)
			blogs.filter(b => b.id !== id)
		}
	}

	const handleLogout = () => {
		setUser(null)
		storage.logoutUser()
	}

	if ( !user ) {
		return (
			<div>
				<h2>login to application</h2>

				<Notification />

				<form onSubmit={handleLogin}>
					<div>
            username
						<input
							id='username'
							value={username}
							onChange={({ target }) => setUsername(target.value)}
						/>
					</div>
					<div>
            password
						<input
							id='password'
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button id='login'>login</button>
				</form>
			</div>
		)
	}

	const byLikes = (b1, b2) => b2.likes - b1.likes

	return (
		<div>
			<h2>blogs</h2>

			<Notification />

			<p>
				{user.name} logged in <button onClick={handleLogout}>logout</button>
			</p>
			{
				<Togglable buttonLabel='create new blog'  ref={blogFormRef}>
					<NewBlog />
				</Togglable>}

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

export default App