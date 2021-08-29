import React from 'react'

//Prints out the course header
const Header = ({ course }) => <h2>{course.name}</h2>

//Prints out a course content's name and amount of exercises in it
const Part = ({ name, exercise }) => {
    console.log('Part')
  return (
    <p>
      {name} {exercise}
    </p>
  )
}

//Maps out course contents name and exercise amount for Part component
const Content = ({ parts }) => {
  console.log('Content', parts)
  return (
  <div>
    {parts.map(part =>
        <Part key={part.id} name={part.name} exercise={part.exercises} />
    )}
  </div>
  )
}

//Counts total amount of exercises and prints it out
const Total = ({ parts }) => {
    const totalAmount = parts
      .map(part => part.exercises)
      .reduce((total, count) => {
        
        return total + count}, 0)
        
    return (
        <h4>Total of {totalAmount} exercises </h4>
    )
}

//Maps out courses array as individual courses for header, content and total components
const Course = ({ courses }) => {
  return (
        <div>
          <h1>Web Development Curriculum</h1>
          {courses.map(course => (
            <div key={course.id}>
              <Header course={course} />
              <Content parts={course.parts} />
              <Total parts={course.parts} />
            </div>
            )
          )}
        </div>
    )
}

export default Course