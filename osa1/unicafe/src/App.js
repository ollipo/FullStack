import React, { useState } from 'react'

const Display = ({ count, text }) => <p>{text} {count}</p>

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
      <Display count={good} text='good' />
      <Display count={neutral} text='neutral' />
      <Display count={bad} text='bad' />
    </div>
  )
}

export default App