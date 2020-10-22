import React, { useState } from "react"
import Contacts from "./components/Contacts"
import Form from "./components/Form"
import Filter from "./components/Filter"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setNewSearch] = useState("")

  const addContact = (event) => {
    event.preventDefault()

    const repeatedName = persons
      .filter((person) => person.name === newName)
      .map((hit) => hit.name)
      .join()

    const repeatedNumber = persons
      .filter((person) => person.number === newNumber)
      .map((hit) => hit.number)
      .join()
    // Check no repetion or empty field
    if (!(repeatedName || repeatedNumber)) {
      // show a message if one of the inputs is empty or both and don't reset
      if (!(newName && newNumber)) {
        window.alert("Please fill the missing contact info!")
        return
      }

      const personObj = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObj))
    }
    // In case of a repeated name or number
    else {
      window.alert(
        `${
          repeatedName.length ? newName : newNumber
        } is already added to phonebook`
      )
    }
    //console.log("Repeated: " + repeatedName + repeatedNumber)
    setNewName("")
    setNewNumber("")
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }
  const isSubstring = (s1, s2) => {
    return s1.toLowerCase().includes(s2.toLowerCase())
  }

  const contacts = search.length
    ? persons.filter((person) => isSubstring(person.name, search))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Filter field */}
      <Filter fieldName={search} onChange={handleSearch} />

      <h3>Add a new</h3>

      {/* Contacts field */}
      <Form
        onSubmit={addContact}
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <div>
        {contacts.map((person) => (
          <Contacts
            key={person.name}
            name={person.name}
            number={person.number}
          />
        ))}
      </div>
    </div>
  )
}

export default App
