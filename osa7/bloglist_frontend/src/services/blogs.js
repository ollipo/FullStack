import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = (blog, auth) => {
	const request = axios.post(baseUrl, blog, auth)
	return request.then(response => response.data)
}

const update = (blog, auth) => {
	const request = axios.put(`${baseUrl}/${blog.id}`, blog, auth)
	return request.then(response => response.data)
}

const remove = (blog, auth) => {
	const request = axios.delete(`${baseUrl}/${blog.id}`, auth)
	return request.then(response => response.data)
}

const createComment = (comment, id) => {
	console.log('comment: ', comment)
	console.log('id: ', id)
	const request = axios.post(`${baseUrl}/${id}/comments`, { comment: comment })
	console.log('request: ', request)
	return request.then(response => response.data)
}

export default { getAll, create, update, remove, createComment }