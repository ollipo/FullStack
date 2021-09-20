import React, {useState} from 'react'
const Blog = ({ blog, name }) => {
  const [visible, setVisible] = useState(false)

  const hideDetailsWhenVisible = { display: visible ? 'none' : '' }
  const showDetailsWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
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
      {blog.likes}<button>like</button><br />
      {name}
    </div>
  </div>
  
  )
}

export default Blog