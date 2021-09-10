/* eslint-disable no-mixed-spaces-and-tabs */
const _ = require('lodash')

const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item
	}
	return blogs
		.map(blog => blog.likes)
		.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	const listOfFavorites = blogs.map(blog => blog.likes)
	const biggestLikesCount = Math.max(...listOfFavorites)
	const mostFavoriteBlog = blogs.find(blog => blog.likes === biggestLikesCount)

	return mostFavoriteBlog
}

const mostBlogs = (blogs) => {
	const result =
    _(blogs)
    	.countBy('author')
    	.map((value, key) => ({
    		'author': key,
    		'blogs': value
    	}))
    	.maxBy('blogs')

	return _.isEmpty(result)
		? 0
		: result
}

const mostLikes = (blogs) => {
	const result =
    _(blogs)
    	.groupBy('author')
    	.map((value, key) => ({
    		'author': key,
    		'likes': _.sumBy(value, 'likes')
    	}))
    	.maxBy('likes')

	return _.isEmpty(result)
		? 0
		: result
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}