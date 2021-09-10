const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs id field exists', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body[0].id).toBeDefined()
})

test('blogs identifier named id', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body[0]).toHaveProperty('id')
})

test('a valid blog can be added ', async () => {
	const newBlog = {
		title: 'A valid blog can be added',
		author: 'me & myself',
		url: 'www.jihuu.fi',
		likes: 4,
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)


	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

	const titles = blogsAtEnd.map(n => n.title)
	expect(titles).toContain(
		'A valid blog can be added'
	)
})

afterAll(() => {
	mongoose.connection.close()
})