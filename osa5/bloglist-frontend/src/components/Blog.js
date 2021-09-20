import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideDetailsWhenVisible = { display: visible ? 'none' : '' }
  const showDetailsWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  
  const handleLikeIncrease = async () => {
    const blogUpdate = {
      id: blog.id,
      likes: likes + 1
    }
    const updatedBlog = await blogService.update(blogUpdate)
    setLikes(updatedBlog.likes)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
  <div style={blogStyle}>
    <div style={hideDetailsWhenVisible}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>view</button>
    </div>
    <div style={showDetailsWhenVisible}>
      {blog.title}
      {blog.author}
      <button onClick={toggleVisibility}>hide</button><br />
      {blog.url}<br />
      {likes}<button onClick={handleLikeIncrease}>like</button><br />
      {user.name}
    </div>
  </div>
  
  )
}

export default Blog