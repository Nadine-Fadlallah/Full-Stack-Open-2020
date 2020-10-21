import React, { useState } from "react"
import Contacts from "./components/Contacts"
import Names from "./components/Contacts"

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }])
  const [newName, setNewName] = useState("")

  const addName = (event) => {
    event.preventDefault()
    
    const personObj = {
      name: newName
    }

    setPersons(persons.concat(personObj))
    setNewName("")
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <Contacts key={person.name} name={person.name} />
        ))}
      </div>
    </div>
  )
}

export default App
