import React from 'react'

const Header = ({ course }) => <h1>{course.name}</h1>

const Part = ({ name, exercise }) => {
    console.log('Part')
  return (
    <li>
      {name} {exercise}
    </li>
  )
}

const Content = ({ parts }) => {
  console.log(parts)
  return (
  <div>
    <ul>
        {parts.map(part =>
            <Part key={part.name} name={part.name} exercise={part.exercises} />
        )}
    </ul>
  </div>
  )
}

//const Total = (props) => <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
        </div>
    )
}

export default Course