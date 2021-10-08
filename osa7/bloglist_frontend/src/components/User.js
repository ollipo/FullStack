import React from 'react'

const User = ({ user }) => {
	console.log('User')

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
							{user.name}
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

/* Blog.propTypes = {
	blog: PropTypes.shape({
		title: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
	}).isRequired,
	handleLike: PropTypes.func.isRequired,
	handleRemove: PropTypes.func.isRequired,
	own: PropTypes.bool.isRequired
} */

export default User