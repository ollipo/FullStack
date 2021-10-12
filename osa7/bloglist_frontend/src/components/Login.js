import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'
import { loginUser, logoutUser } from '../reducers/loginReducer'
import { Form, Button } from 'react-bootstrap'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const user = useSelector(state => state.user)

	const dispatch = useDispatch()

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			dispatch(loginUser({
				username, password
			}))
			setUsername('')
			setPassword('')
		} catch(exception) {
			return
		}
	}

	const handleLogout = () => {
		dispatch(logoutUser(user))
		dispatch(removeNotification())
	}

	if ( !user ) {
		return (
			<div>
				<Form onSubmit={handleLogin}>
					<Form.Group>
						<Form.Label>username</Form.Label>
						<Form.Control
							id='username'
							value={username}
							onChange={({ target }) => setUsername(target.value)}
						/>
						<Form.Label>password</Form.Label>
						<Form.Control
							id='password'
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
						<Button variant="primary" type="submit" id='login'>login</Button>
					</Form.Group>

				</Form>
			</div>
		)
	}

	return (
		<div>
			<p>
				{user.name} logged in <Button variant="secondary" onClick={handleLogout}>logout</Button>
			</p>
		</div>
	)
}

export default Login