import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
	const [ blogs, setBlogs ] = useState([])
	const [ username, setUsername ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ user, setUser ] = useState(null)
	const [ notification, setNotification ] = useState(null)
	const [ errorMessage, setErrorMessage ] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLikes = (id) => {
		setBlogs(
			blogs.map(blog => blog.id === id ?
				{ ...blog, likes: blog.likes + 1 } :
				blog))
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password,
			})
			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
			setNotification(`You're now logged in ${user.name}`)
			setTimeout(() => {
				setNotification(null)
			}, 1500)
		} catch (exception) {
			setErrorMessage('Wrong or missing username or password')
			setTimeout(() => {
				setErrorMessage(null)
			}, 3000)
		}
	}

	const handleLogout = async () => {
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
		setUsername('')
		setPassword('')
	}

	const blogFormRef = useRef()

	const addBlog = async (blogObject) => {
		blogFormRef.current.toggleVisibility()
		try {
			const returnedBlog = await blogService.create(blogObject)
			setBlogs(blogs.concat(returnedBlog))
			setNotification(`${user.name}, you created a new blog post`)
			setTimeout(() => {
				setNotification(null)
			}, 3000)
		} catch (exception) {
			setErrorMessage('Missing a title, an author or an url')
			setTimeout(() => {
				setErrorMessage(null)
			}, 3000)
		}

	}

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
        username
				<input
					id='username'
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
        password
				<input
					id='password'
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button id="login-button" type="submit">login</button>
		</form>
	)

	const blogForm = () => (
		<Togglable buttonLabel='create new blog' ref={blogFormRef}>
			<BlogForm createBlog={addBlog} />
		</Togglable>
	)

	const Notification = ({ message }) => {
		if (message === null) {
			return null
		}

		return (
			<div className="notification">
				{message}
			</div>
		)
	}

	const ErrorMessage = ({ message }) => {
		if (message === null) {
			return null
		}

		return (
			<div className="errorMessage">
				{message}
			</div>
		)
	}

	return (
		<div>
			{user === null ?
				<div>
					<h2>Log in to application</h2>
					<Notification message={notification} />
					<ErrorMessage message={errorMessage} />
					{loginForm()}
				</div>:
				<div>
					<h2>blogs</h2>
					<Notification message={notification} />
					<ErrorMessage message={errorMessage} />
					<p>
						{user.name} logged in
						<button onClick={handleLogout}>logout</button>
					</p>
					{blogForm()}
					{blogs
						.sort((a, b) => b.likes - a.likes)
						.map(blog =>
							<Blog
								key={blog.id}
								blog={blog}
								user={user}
								handleLikes={handleLikes}
								setBlogs={setBlogs}
								blogs={blogs}
							/>
						)}
				</div>
			}
		</div>
	)
}

export default App