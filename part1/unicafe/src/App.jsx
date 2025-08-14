import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({stat, text}) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{stat}</td>
      </tr>
    </tbody>
  )
}


const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  if (total === 0) {
    return <>No feedback given</>
  }
  
  const average = (good - bad) / total
  const positive = 100.0 * good / total + ' %'

  return (
    <>
      <table>
        <StatisticLine stat={good} text='good' />
        <StatisticLine stat={neutral} text='neutral' />
        <StatisticLine stat={bad} text='bad' />
        <StatisticLine stat={total} text='all' />
        <StatisticLine stat={average} text='average' />
        <StatisticLine stat={positive} text='positive' />
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>

      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />

    </>
  )
}

export default App