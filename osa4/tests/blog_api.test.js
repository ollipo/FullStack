const mongoose = require('mongoose')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let token

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
	await User.deleteMany({})

	const saltRounds = 10
	const passwordHash = await bcrypt.hash('top secret5', saltRounds)

	const user = new User({
		_id:'6142641c964bf7f364cee2dd',
		username: 'ollipo5',
		name: 'Olli',
		passwordHash
	})

	await user.save()

	const res = await api .post('/api/login/').send({
		username: 'ollipo5',
		password: 'top secret5',
	})
	const loggedUser = res.body
	token = loggedUser.token
})

describe('when there is initially some notes saved', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})
})

describe('viewing a specific note', () => {
	test('blogs id field exists', async () => {
		const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)

		expect(response.body[0].id).toBeDefined()
	})

	test('blogs identifier named id', async () => {
		const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)

		expect(response.body[0]).toHaveProperty('id')
	})
})

describe('addition of a new note', () => {
	test('a valid blog can be added ', async () => {
		const newBlog = {
			title: 'A valid blog can be added',
			author: 'me & myself',
			url: 'www.jihuu.fi',
			likes: 4,
		}

		await api
			.post('/api/blogs').set('Authorization', `Bearer ${token}`)
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


	test('a blog without likes property returns 0 to likes', async () => {
		const newBlog = {
			title: 'A blog without likes property returns 0 to likes',
			author: 'I & myself',
			url: 'www.jippii.fi',
		}

		const result = await api
			.post('/api/blogs').set('Authorization', `Bearer ${token}`)
			.send(newBlog)
			.expect(201)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

		const zeroLikes = blogsAtEnd.find(n => n.id.toString() === result.body.id)
		expect(zeroLikes.likes).toBe(0)
	})

	test('a blog without title or url property returns status code 400', async () => {
		const newBlog = {
			author: 'Me, I & myself',
		}

		await api
			.post('/api/blogs').set('Authorization', `Bearer ${token}`)
			.send(newBlog)
			.expect(400)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

		const authors = blogsAtEnd.map(n => n.author)
		expect(authors).not.toContain(
			'Me, I & myself'
		)
	})
})

describe('deletion of a blog', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length - 1
		)

		const titles = blogsAtEnd.map(r => r.title)

		expect(titles).not.toContain(blogToDelete.title)
	})
})

describe('updating a blog', () => {
	test('likes can be updated with valid id', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]
		const newBlog = {
			likes: 14,
		}

		const result = await api
			.put(`/api/blogs/${blogToUpdate.id}`).set('Authorization', `Bearer ${token}`)
			.send(newBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/)


		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

		const blog = blogsAtEnd.find(n => n.id.toString() === result.body.id)
		expect(blog.likes).toBe(14)
	})
})

afterAll(() => {
	mongoose.connection.close()
})