const storageKey = 'loggedBlogAppUser'

const saveUser = (user) =>
	localStorage.setItem(storageKey, JSON.stringify(user))

const loadUser = () => {
	try {
		const stateStr = JSON.parse(localStorage.getItem(storageKey))
		console.log('stateStr: ', stateStr)
		return stateStr ? stateStr : undefined
	} catch (e) {
		console.error(e)
		return undefined
	}
}

const logoutUser = () =>
	localStorage.removeItem(storageKey)

export default {
	saveUser,
	loadUser,
	logoutUser
}