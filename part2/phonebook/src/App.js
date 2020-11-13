import React, { useState, useEffect } from "react";
import Contacts from "./components/Contacts";
import Form from "./components/Form";
import Filter from "./components/Filter";
import personService from "./services/Persons";
import Notification from "./components/Notification";
import Error from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [search, setNewSearch] = useState("");

  const [notification, setNewNotification] = useState(null);

  const [errorMessage, setNewErrorMessage] = useState(null);

  //---------------------------- FETCHING CONTACTS FROM THE SERVER ----------------------------//
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      console.log("response fullfied");
      setPersons(initialPersons);
    });
  }, []);

  //---------------------------- ADDING A NEW CONTACT / MODIFYING AN EXISTING ONE ----------------------------//
  const addContact = (event) => {
    event.preventDefault();

    const repeatedNamePerson = persons.find(
      (person) => person.name === newName
    ); //returns the person that matches the entered name

    const repeatedNumberPerson = persons.find(
      (person) => person.number === newNumber
    ); //returns the person that matches the entered number

    // Check for no repeated field(s)
    if (!(repeatedNamePerson || repeatedNumberPerson)) {
      // Check for no empty field(s)
      if (!(newName && newNumber)) {
        // show an alert message in case of empty input(s) & don't clear that field
        window.alert("Please fill the missing contact info!");
        return;
      }

      const personObj = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(personObj)
        .then((addedPerson) => setPersons(persons.concat(addedPerson)));

      // Shows a notification message for 5 secs
      setNewNotification(`Added ${newName}`);
      setTimeout(() => {
        setNewNotification(null);
      }, 5000);
    }

    // In case of a repeated name or/and number
    else {
      //const errorAlert = False;
      // Here I have a person with a repeated name and a new number
      if (!repeatedNumberPerson) {
        // && repeatedName)

        // So I'm asking if he wants the contact to be modified
        if (
          window.confirm(
            `${repeatedNamePerson.name} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          // If yes, I'll make a new changed contact with the new number entered
          const changedPerson = { ...repeatedNamePerson, number: newNumber };

          // then I'll update the backend and webpage with our modified contact
          personService
            .update(changedPerson.id, changedPerson)
            .then((
              updatedPerson //console.log(updatedPerson)
            ) =>
              setPersons(
                persons.map((person) =>
                  person.id !== changedPerson.id ? person : updatedPerson
                )
              )
            )
            .catch((error) => {
              // In case of an error caught(e.g., modifying a deleted contact), display an error alert for 5 secs
              setNewErrorMessage(
                `Information of ${changedPerson.name} has already been removed from server!!!`
              );
              setTimeout(() => {
                setNewErrorMessage(null);
              }, 5000);
              // and remove that errory update from the webpage (webpage and backend are now consistent)
              setPersons(
                persons.filter((person) => person.id !== changedPerson.id)
              );
            });

          // If no error is caught (update is successful), display a notification message for 5 secs
          if (errorMessage) {
            setNewNotification(`Modified ${changedPerson.name}`);
            setTimeout(() => {
              setNewNotification(null);
            }, 5000);
          }
        }
      }

      // Here I have a person with a repeated number with either an old or new name
      else {
        // So I'm displaying an alert that a name/number is repeated
        window.alert(
          `${
            repeatedNamePerson !== repeatedNumberPerson ? newNumber : newName
          } is already added to phonebook`
        );
      }
    }

    // When all is done, clear both fields
    setNewName("");
    setNewNumber("");
  };

  //---------------------------- DELETING A CONTACT ----------------------------//

  const handleDelete = (deletedPerson) => {
    if (window.confirm(`Delete ${deletedPerson.name} ?`)) {
      personService.deleteContact(deletedPerson.id);

      const filteredPersons = persons.filter(
        (person) => person.id !== deletedPerson.id
      );

      setPersons(filteredPersons);
    }
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

      {/* Notification */}
      <Notification message={notification} />

      {/* Error */}
      <Error message={errorMessage} />

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
            key={person.id}
            name={person.name}
            number={person.number}
            onClick={() => handleDelete(person)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
