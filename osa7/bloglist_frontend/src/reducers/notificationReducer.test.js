import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
	test('returns new state with action SET_NOTICATION', () => {
		const state = []
		const action = {
			type: 'SET_NOTIFICATION',
			notification: 'the notification state is in redux store'
		}

		deepFreeze(state)
		const newState = notificationReducer(state, action)

		expect(newState).toContain(action.notification)
	})

	test('returns empty state with action REMOVE_NOTICATION', () => {
		const state = []
		const action = {
			type: 'SET_NOTIFICATION',
			notification: 'the notification state is in redux store'
		}

		deepFreeze(state)
		notificationReducer(state, {
			type: 'REMOVE_NOTIFICATION' })

		const newState = notificationReducer(state, action)

		expect(newState).toContain([])
	})
})