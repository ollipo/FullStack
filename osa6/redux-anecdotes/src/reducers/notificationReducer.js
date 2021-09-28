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
export const setNotification = (content, sec) => {
    return async dispatch => {
        await dispatch(createNotification(content))
        if (timeOut){
            clearTimeout(timeOut)
            timeOut = null
        }
        timeOut = setTimeout(() => 
            {dispatch(removeNotification())}, sec*1000 )
    }
}

export const createNotification = notification => {
    return {
        type: 'SET_NOTIFICATION',
        notification,
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

export default notificationReducer