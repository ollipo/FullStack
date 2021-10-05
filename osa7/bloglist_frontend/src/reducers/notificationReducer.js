const notificationReducer = (state = null, action) => {
	switch (action.type) {
	case 'SET_NOTIFICATION':
		return action.notification
	case 'REMOVE_NOTIFICATION':
		return state = null
	default:
		return state
	}
}
let timeOut
export const setNotification = (content, type='success', sec) => {
	return async dispatch => {
		await dispatch(createNotification(content, type))
		if (timeOut){
			clearTimeout(timeOut)
			timeOut = null
		}
		timeOut = setTimeout(() =>
		{dispatch(removeNotification())}, sec*1000 )
	}
}

export const createNotification = (content, type) => {
	return {
		type: 'SET_NOTIFICATION',
		notification: {
			message: content,
			type: type
		},
	}
}

export const removeNotification = () => {
	return {
		type: 'REMOVE_NOTIFICATION'
	}
}

export default notificationReducer