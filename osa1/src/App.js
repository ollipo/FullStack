import React from 'react'

const Header = (props) => <h1>{props.course}</h1>

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
  return (
  <div>
    <Part name1={props.name1} exercise1={props.exercise1} />
    <Part name2={props.name2} exercise2={props.exercise2} />
    <Part name3={props.name3} exercise3={props.exercise3} />
  </div>
  )
}

const Total = (props) => <p>Number of exercises {props.exercises}</p>

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content name1={part1.name} exercise1={part1.exercises} />
      <Content name2={part2.name} exercise2={part2.exercises} />
      <Content name3={part3.name} exercise3={part3.exercises} />
      <Total exercises={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App