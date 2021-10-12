import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
	console.log('Notification')
	const notification = useSelector(state => state.notification)

	if ( !notification ) {
		return null
	}

	/* const style = {
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		color: notification.type === 'success' ? 'green' : 'red',
		background: 'lightgrey'
	} */

	return (
		<Alert variant="success">
			{notification.message}
		</Alert>
	)

}

export default Notification