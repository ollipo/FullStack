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
import { Navbar, Nav } from 'react-bootstrap'
import {
	BrowserRouter as Router,
	Switch, Route, Link
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
			<div className="container">
				<h2>login to application</h2>

				<Notification />
				<Login />
			</div>
		)
	}

	return (
		<div className="container">
			<Router>
				<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href="#" as="span">
								<Link to="/">blogs</Link>
							</Nav.Link>
							<Nav.Link href="#" as="span">
								<Link to="/users">users</Link>
							</Nav.Link>
						</Nav>
						<Navbar.Text>
							<Login />
						</Navbar.Text>
					</Navbar.Collapse>
				</Navbar>
				<Switch>
					<Route path='/users/:id'>
						<Notification />
						<UserList />
					</Route>
					<Route path='/users'>
						<UserList />
					</Route>
					<Route path='/blogs/:id'>
						<h2>blog:</h2>
						<Notification />
						<BlogList />
					</Route>
					<Route>
						<h2>blog app</h2>
						<Notification />
						<Togglable buttonLabel='create new blog'  ref={blogFormRef}>
							<NewBlog />
						</Togglable>
						<BlogList />
					</Route>
				</Switch>
			</Router>
		</div>
	)

}

export default App