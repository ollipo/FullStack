import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import storage from './utils/storage'
import {
	BrowserRouter as Router,
	Switch, Route
} from 'react-router-dom'

const App = () => {
	const blogFormRef = React.createRef()
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	console.log('before useEffects')

	useEffect(() => {
		dispatch(initializeBlogs())
		dispatch(initializeUsers())
		const loggedUserJSON = storage.loadUser()
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
		<Router>
			<Switch>
				<Route path='/users'>
					<h2>blogs</h2>
					<Login />
					<UserList />
				</Route>
				<Route>
					<h2>blogs</h2>
					<Notification />
					<Login />
					<Togglable buttonLabel='create new blog'  ref={blogFormRef}>
						<NewBlog />
					</Togglable>
					<BlogList />
				</Route>
			</Switch>
		</Router>
	)

}

export default App