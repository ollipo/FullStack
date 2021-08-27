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
  console.log('Content', parts)
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

const Total = ({ parts }) => {
    const totalAmount = parts
      .map(part => part.exercises)
      .reduce((total, count) => {
        
        return total + count}, 0)
        
    return (
        <p>Total of {totalAmount} exercises </p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course