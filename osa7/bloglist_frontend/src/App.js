import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import BlogList from './components/BlogList'
import { initializeBlogs } from './reducers/blogReducer'
import storage from './utils/storage'

const App = () => {
	const blogFormRef = React.createRef()
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	useEffect(() => {
		const loggedUserJSON = storage.loadUser()
		console.log('loggedUserJSON: ', loggedUserJSON)
		if (loggedUserJSON) {
			const user = loggedUserJSON
			dispatch({
				type: 'NEW_USER',
				data: user,
			})
		}
	}, [])

	if ( !user ) {
		return (
			<div>
				<h2>login to application</h2>

				<Notification />
				<Login />
			</div>
		)
	}

	return (
		<div>
			<h2>blogs</h2>

			<Notification />
			<Login />
			<Togglable buttonLabel='create new blog'  ref={blogFormRef}>
				<NewBlog />
			</Togglable>
			<BlogList />
		</div>
	)

}

export default App