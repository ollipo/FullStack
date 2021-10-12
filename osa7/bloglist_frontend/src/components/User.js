import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const User = ({ user }) => {
	console.log('User: ', user)
	return (
		<Table striped variant="light" hover >
			<thead>
				<tr>
					<th></th>
					<th>blogs created</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<Link to={`/users/${user.id}`}>{user.name}</Link>
					</td>
					<td>
						{user.blogs.length}
					</td>
				</tr>
			</tbody>
		</Table>
	)
}

export default User