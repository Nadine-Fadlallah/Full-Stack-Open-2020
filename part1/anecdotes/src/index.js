import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text})=> <button onClick={handleClick}>{text}</button>

const MaxAnecdote = ({points, anecdotes}) =>
{
  const maxVotes = Math.max(...points)
  
  const maxAnecdote = anecdotes[points.indexOf(maxVotes)]
 //console.log(maxVotes,maxAnecdote)
 if(maxVotes === 0) 
  return <p>No votes yet</p>

  return(
    <>
  <div>{maxAnecdote}</div>
  <div>has {maxVotes} votes</div>
  </>
  )
}


const App = (props) => {
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(6).fill(0))

  const randomAnecdote = () =>{
    const newSelected = Math.floor(Math.random() * 6)
    //console.log(newSelected)
    setSelected(newSelected)
  }

  const voteAnecdote = (selected) =>{
    const updatedPoints = [...points]
    updatedPoints[selected]+=1
    //console.log(selected, updatedPoints)
    setPoints(updatedPoints)
  }
  
  return (
    <>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}

      <div>has {points[selected]} votes</div>
      
      <Button handleClick={()=>voteAnecdote(selected)} text={"vote"}/>
      <Button handleClick={randomAnecdote} text={"next anecdote"}/>
      
      <h1>Anecdote with the most votes</h1>
      <MaxAnecdote  points={points} anecdotes={anecdotes}/>
    </>
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