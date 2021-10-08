import React from 'react'
import { useSelector } from 'react-redux'
import User from './User'

const UserList = () => {
	console.log('UserList')
	const users = useSelector(state => state.users)

	return (
		<div>
			<h2>users</h2>
			{users.map(user =>
				<User
					key={user.id}
					user={user}
				/>
			)}
		</div>
	)

}

export default UserList