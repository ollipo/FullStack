const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
	const blogs =
		await Blog
			.find({})
			.populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
	const body = request.body

	// eslint-disable-next-line no-undef
	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	if (!request.token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const user = request.user
	const userDb = await User.findById(user.id)
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user.id
	})

	const savedBlog = await blog.save()
	userDb.blogs = userDb.blogs.concat(savedBlog._id)
	await userDb.save()

	response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
	// eslint-disable-next-line no-undef
	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	if (!request.token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const user = request.user
	const blog = await Blog.findById(request.params.id)
	const blogUser = blog.user._id.toString()

	if(user.id !== blogUser) {
		return response.status(401).json({ error: 'wrong user' })
	}

	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body
	const blog = {
		likes: body.likes,
	}
	console.info('body: ', body)
	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.json(updatedBlog)
})

module.exports = blogsRouter