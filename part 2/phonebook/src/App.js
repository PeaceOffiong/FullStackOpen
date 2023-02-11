import { useEffect, useState } from "react";
import Filter from "./Components/Filter";
import Form from "./Components/Form";
import Persons from "./Components/Persons";
import Service from "./services/contacts";
import Notification from "./Components/Notifications";
import "./style.css";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [displayPersons, setDisplayPersons] = useState();
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [NotificationM, setNotificationM] = useState(null);

  useEffect(() => {
    Service.getContacts().then((contacts) => {
      setPersons(contacts);
      setDisplayPersons(contacts);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loopResult = persons.find((name) => name.name === newName);
    let updatedNumber = { ...loopResult, number: newNumber };
    if (loopResult === undefined) {
      const addedPerson = {
        name: newName,
        number: newNumber,
      };

      Service.postContact(addedPerson).then((response) => {
        setPersons(persons.concat(response));
        setDisplayPersons(persons.concat(response));
        const newNotif = { message: "Contact successfully Added", color: "green" };
        setNotificationM(newNotif);
        setTimeout(() => {
          setNotificationM(null);
        }, 5000);
      });
    } else {
      if (
        window.confirm(
          `${newName}'s Contact already Exists, Do you want to update the old Number?`
        )
      ) {
        Service.updateContact(loopResult.id, updatedNumber)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== loopResult.id ? person : response
              )
            );
            setDisplayPersons(
              persons.map((person) =>
                person.id !== loopResult.id ? person : response
              )
            );
            const newNotif = {
              message: "Contact successfully Updated",
              color: "green",
            };
            setNotificationM(newNotif);
            setTimeout(() => {
              setNotificationM(null);
            }, 5000);
          })
          .catch((error) => {
            const newNotif = {
              message: "Contact has already been deleted from server",
              color: "red",
            };
            setNotificationM(newNotif);
            setTimeout(() => {
              setNotificationM(null);
            }, 5000);
            setDisplayPersons(
              persons.filter((person) => person.id !== loopResult.id)
            );
            setPersons(persons.filter((person) => person.id !== loopResult.id));
          });
      }
    }
    setNewName("");
    setNewNumber("");
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setNewName(value);
  };

  const handleNumber = (e) => {
    const value = e.target.value;
    setNewNumber(value);
  };

  const handleFilter = (e) => {
    const copyPersons = [...persons];
    const value = e.target.value;
    const returnValue = copyPersons.filter((person) =>
      person.name.toLowerCase().includes(value)
    );

    setDisplayPersons(returnValue);
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    const eliminatePerson = persons.filter((person) => person.id !== id);
    if (window.confirm(`Do You Really want to delete ${person.name}?`)) {
      Service.deleteContact(id).then((response) => {
        setPersons(eliminatePerson);
        setDisplayPersons(eliminatePerson);
        const newNotif = {
          message: "Contact successfully Deleted",
          color: "red",
        };
        setNotificationM(newNotif);
        setTimeout(() => {
          setNotificationM(null);
        }, 5000);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification NotificationM={NotificationM} />
      <Filter handleFilter={handleFilter} />

      <h2>Add new Contact</h2>
      <Form
        handleSubmit={handleSubmit}
        newName={newName}
        handleInput={handleInput}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />

      <h2>Numbers</h2>
      <Persons displayPersons={displayPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
