import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
	blogs: blogReducer,
	notification: notificationReducer,
	user: loginReducer,
	users: userReducer
})
const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(thunk)
	)
)

//store.subscribe(() => console.log('storeState: ', store.getState()))

export default store