import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(anecdotes.length).fill(0))

  const handleClick = () => {
    const newValue = (max) => { 
      let random = Math.floor(Math.random() * max)
      return random
    }
    setSelected(newValue(anecdotes.length))
  }

  const handleVote = () => {
    const copyArray = votes
    copyArray[selected]++
    setVote(copyArray)
  }
  
  const showMostVoted = () => {
    const position = votes.indexOf(Math.max(...votes))
    return anecdotes[position]
  }
  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]} <br></br>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {showMostVoted()}
    </div>
  )
}



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)