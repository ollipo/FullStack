import userService from '../services/users'

export const initializeUsers = () => {
	return async dispatch => {
		const users = await userService.getAll()
		dispatch({
			type: 'INIT_USERS',
			data: users,
		})
	}
}

const userReducer = (state = [], action) => {
	switch(action.type) {
	/* case 'NEW_USER':
		return action.data
	case 'REMOVE_USER':
		return state = null */
	case 'INIT_USERS':
		return action.data
	/* case 'VOTE':
		return state.map(blog =>
			blog.id !== action.data.id ? blog : action.data
		) */
	default:
		return state
	}
}

export default userReducer