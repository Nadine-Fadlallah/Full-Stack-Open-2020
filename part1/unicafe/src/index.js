import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>
const Button = ({handleClick, text}) => <button onClick={handleClick} >{text}</button>

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      
    <Header text={"give feedback"}/>

    <Button handleClick={()=>setGood(good+1)} text={"good"}/>
    <Button handleClick={()=>setNeutral(neutral+1)} text={"neutral"}/>
    <Button handleClick={()=>setBad(bad+1)} text={"bad"}/>

    <Header text={"statistics"}/>

    <div>good {good}</div>
    <div>neutral {neutral}</div>
    <div>bad {bad}</div>
    <div >all {good+bad+neutral}</div>
    <div >average {(good-bad)/(good+bad+neutral)}</div>
    <div >positive {(good/(good+bad+neutral))*100} %</div>

    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)