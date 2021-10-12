import React from 'react'
import { useSelector } from 'react-redux'
import User from './User'
import UserInfo from './UserInfo'
import {
	useParams
} from 'react-router-dom'

const UserList = () => {
	const users = useSelector(state => state.users)
	const id = useParams().id
	const routeUser = users.find(n => n.id === id)

	if (routeUser) {
		return (
			<UserInfo
				key={routeUser.id}
				user={routeUser}
			/>
		)
	}

	return (
		<div>
			<h2>users</h2>
			<User
				users={users}
			/>
		</div>
	)

}

export default UserList