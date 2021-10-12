import blogService from '../services/blogs'

export const vote = (blog, auth) => {
	return async dispatch => {
		const updatedBlog = await blogService.update(blog, auth)
		dispatch(initializeBlogs())
		dispatch({
			type: 'VOTE',
			data: updatedBlog
		})
	}
}

export const createBlog = (blog, auth) => {
	return async dispatch => {
		const newBlog = await blogService.create(blog, auth)
		dispatch({
			type: 'NEW_BLOG',
			data: newBlog,
		})
	}
}

export const createComment = (comment, id) => {
	return async dispatch => {
		const commentedBlog = await blogService.createComment(comment, id)
		dispatch(initializeBlogs())
		dispatch({
			type: 'ADD_COMMENT',
			data: commentedBlog,
		})
	}
}

export const removeBlog = (blog, auth) => {
	return async dispatch => {
		await blogService.remove(blog, auth)
		dispatch({
			type: 'REMOVE_BLOG',
			data: blog,
		})
	}
}

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: 'INIT_BLOGS',
			data: blogs,
		})
	}
}

const blogReducer = (state = [], action) => {
	switch(action.type) {
	case 'NEW_BLOG':
		return [...state, action.data]
	case 'REMOVE_BLOG':
		return state.filter(blog =>
			blog.id !== action.data.id
		)
	case 'INIT_BLOGS':
		return action.data
	case 'VOTE':
		return state.map(blog =>
			blog.id !== action.data.id ? blog : action.data
		)
	case 'ADD_COMMENT':
		return state.map(blog =>
			blog.id !== action.data.id ? blog : action.data
		)
	default:
		return state
	}
}

export default blogReducer