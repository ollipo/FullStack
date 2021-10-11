import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
	console.log('User: ', user)
	return (
		<div>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>blogs created</th>
					</tr>
					<tr>
						<td>
							<Link to={`/users/${user.id}`}>{user.name}</Link>
						</td>
						<td>
							{user.blogs.length}
						</td>
					</tr>
				</tbody>
			</table>

		</div>
	)
}

export default User