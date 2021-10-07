import loginService from '../services/login'
import storage from '../utils/storage'
import { setNotification } from './notificationReducer'

/* export const vote = (blog) => {
	return async dispatch => {
		const updatedBlog = await blogService.update(blog)
		dispatch({
			type: 'VOTE',
			data: updatedBlog
		})
	}
} */

export const loginUser = (user) => {
	return async dispatch => {
		const loggedInUser = await loginService.login(user)
		storage.saveUser(loggedInUser)
		try {
			dispatch(setNotification(
				`${loggedInUser.name} welcome back!`, 'success', 5))
		} catch(exception) {
			dispatch(setNotification('wrong username/password', 'error', 5))
		}
		dispatch({
			type: 'NEW_USER',
			data: loggedInUser,
		})
	}
}

export const logoutUser = (user) => {
	return async dispatch => {
		storage.logoutUser()
		dispatch({
			type: 'REMOVE_USER',
			data: user,
		})
	}
}

/* export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: 'INIT_BLOGS',
			data: blogs,
		})
	}
} */

const userReducer = (state = null, action) => {
	switch(action.type) {
	case 'NEW_USER':
		return action.data
	case 'REMOVE_USER':
		return state = null
	/* case 'INIT_BLOGS':
		return action.data
	case 'VOTE':
		return state.map(blog =>
			blog.id !== action.data.id ? blog : action.data
		) */
	default:
		return state
	}
}

export default userReducer