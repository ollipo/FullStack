import loginService from '../services/login'
import storage from '../utils/storage'
import { setNotification } from './notificationReducer'

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

const loginReducer = (state = null, action) => {
	console.log('loginReducer: ', action)
	switch(action.type) {
	case 'NEW_USER':
		return action.data
	case 'REMOVE_USER':
		return state = null
	default:
		return state
	}
}

export default loginReducer