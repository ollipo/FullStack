import blogService from '../services/blogs'



/* export const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const voteOf = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const anecdoteInDb =
      await anecdoteService
      .update(changedAnecdote.id, changedAnecdote)
    dispatch({
      type: 'VOTE',
      data: anecdoteInDb
    })
  }
} */

export const createBlog = (blog) => {
	return async dispatch => {
		const newBlog = await blogService.create(blog)
		//blogFormRef.current.toggleVisibility()
		dispatch({
			type: 'NEW_BLOG',
			data: newBlog,
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
	case 'INIT_BLOGS':
		return action.data
		/* case 'VOTE':
      const id = action.data.id
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.data
      ) */
	default:
		return state
	}
}

export default blogReducer