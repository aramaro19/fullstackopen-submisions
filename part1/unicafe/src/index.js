import React, { useState} from 'react'
import ReactDOM  from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)


  return <div>
    <h1>give feedback</h1>
    <Button onClick={handleGood} text='good'/>
    <Button onClick={handleNeutral} text='neutral'/>
    <Button onClick={handleBad} text='bad'/>
    <h1>statistics</h1>
    <Statistics good={good} neutral={neutral} bad={bad}/>
  </div>
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const History = ({reviewType, text}) => <div>{text} {reviewType}</div>

const Average = ({good, neutral, bad}) => {
  let average = (good - bad) / (good + neutral + bad)
  if(isNaN(average)){
    return <div>average 0</div>
  }
  else return <div>average {average}</div>
}
const Positive = ({good, neutral, bad}) => {
  let positivePercent = good / ( good + neutral + bad) * 100
  if(isNaN(positivePercent)) {
    return <div>positive 0</div>
  }
  else {
    return <div>positive {positivePercent} %</div>
  }
}

const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad
  let average = (good - bad) / (good + neutral + bad)
  let positivePercent = `${good / ( good + neutral + bad) * 100} %`

  if(total == 0) {
    return <div>No feedback given</div>
  }
  else return <div>
    <table>
      <tbody>
      <tr>
        <td>good</td>
        <td>{good}</td>
      </tr>
      <tr>
        <td>neutral</td>
        <td>{neutral}</td>
      </tr>
      <tr>
        <td>bad</td>
        <td>{bad}</td>
      </tr>
      <tr>
        <td>all</td>
        <td>{total}</td>
      </tr>
      <tr>
        <td>average</td>
        <td>{average}</td>
      </tr>
      <tr>
        <td>positive</td>
        <td>{positivePercent}</td>
      </tr>
      </tbody>
    </table>
  </div>
}


ReactDOM.render(<App/>, document.getElementById('root'))