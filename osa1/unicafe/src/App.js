import React, { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  if(good === 0 && neutral === 0 && bad === 0) {
    return (
      <p>No feedback given!</p>
    )
    } else {
      return (
        <table>
          <tbody>
              <StatisticLine count={good} text='good' />
              <StatisticLine count={neutral} text='neutral' />
              <StatisticLine count={bad} text='bad' />
              <StatisticLine count={good + neutral + bad} text='all' />
              <StatisticLine count={((good - bad)/(good + neutral + bad)).toFixed(1)} text='average' />
              <StatisticLinePositive count={(good / (good + neutral + bad) * 100).toFixed(1)} text='positive' />
          </tbody>
        </table>
      )
    }
}

const StatisticLinePositive = ({ count, text }) =>
  <tr>
    <td>{text} </td>
    <td>{count} %</td>
  </tr>

const StatisticLine = ({ count, text }) => 
  <tr>
    <td>{text} </td>
    <td>{count}</td>
  </tr>

const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>
    {text}
  </button>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback!</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h2>Statistics:</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App