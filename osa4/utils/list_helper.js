const dummy = (blogs) => {
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
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }