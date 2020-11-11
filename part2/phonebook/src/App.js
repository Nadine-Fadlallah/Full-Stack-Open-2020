import React, { useState, useEffect } from "react";
import Contacts from "./components/Contacts";
import Form from "./components/Form";
import Filter from "./components/Filter";
import personService from "./services/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setNewSearch] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      console.log("response fullfied");
      setPersons(initialPersons);
    });
  }, []);

  const addContact = (event) => {
    event.preventDefault();

    const repeatedName = persons.find((person) => person.name === newName); //returns the person that matches the entered name

    const repeatedNumber = persons.find(
      (person) => person.number === newNumber
    ); //returns the person that matches the entered number

    // console.log(repeatedName + '  ' + repeatedNumber)

    // Check no repetion or empty field(s)
    if (!(repeatedName || repeatedNumber)) {
      // show a message in case of empty input(s) & don't reset
      if (!(newName && newNumber)) {
        window.alert("Please fill the missing contact info!");
        return;
      }

      const personObj = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(personObj)
        .then((updatedPerson) => setPersons(persons.concat(updatedPerson)));
    }
    // In case of a repeated name or number
    else {
      window.alert(
        `${repeatedName ? newName : newNumber} is already added to phonebook`
      );
    }

    setNewName("");
    setNewNumber("");
  };
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  };
  const isSubstring = (s1, s2) => {
    return s1.toLowerCase().includes(s2.toLowerCase());
  };

  const contacts = search.length
    ? persons.filter((person) => isSubstring(person.name, search))
    : persons;

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
  );
};

export default App;
