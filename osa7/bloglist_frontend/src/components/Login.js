import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'
import { loginUser, logoutUser } from '../reducers/userReducer'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const user = useSelector(state => state.user)

	console.log(user)
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

	return (
		<div>
			<p>
				{user.name} logged in <button onClick={handleLogout}>logout</button>
			</p>
		</div>
	)
}

export default Login