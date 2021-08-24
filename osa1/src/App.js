import React from 'react'

const Header = (props) => <h1>{props.course.name}</h1>

const Part = (props) => {
  return (
    <p>
      {props.name1} {props.exercise1}
      {props.name2} {props.exercise2}
      {props.name3} {props.exercise3}
    </p>
  )
}

const Content = (props) => {
  console.log(props)
  return (
  <div>
    <Part name1={props.parts[0].name} exercise1={props.parts[0].exercises} />
    <Part name2={props.parts[1].name} exercise2={props.parts[1].exercises} />
    <Part name3={props.parts[2].name} exercise3={props.parts[2].exercises} />
  </div>
  )
}

const Total = (props) => <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App