import { useEffect, useState } from "react";
import Filter from "./Components/Filter";
import Form from "./Components/Form";
import Persons from "./Components/Persons";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "046892859", id: 0 },
  { name: "Arto Hellas", number: "040-123456", id: 1 },
  { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 }]);

  const [displayPersons, setDisplayPersons] = useState();
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    setDisplayPersons(persons);
  }, [persons])


  const handleSubmit = (e) => {
    e.preventDefault();
    const loopResult = persons.find(name => name.name === newName);
    if (loopResult === undefined) {
      const addedPerson = { name: newName, number: newNumber };
      setPersons([...persons, addedPerson]);
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName}'s Contact already Exists`);
      setNewName("");
      setNewNumber("");
    }
  }

  const handleInput = (e) => {
    const value = e.target.value;
    setNewName(value);
  }

  const handleNumber = (e) => {
    const value = e.target.value;
    setNewNumber(value);
  }

  const handleFilter = (e) => {
    const copyPersons = [...persons];
    const value = e.target.value;
    const returnValue = copyPersons.filter((person) => person.name.toLowerCase().includes(value));

    setDisplayPersons(returnValue);
  }
 

  return (
    <div>

      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      
      <h2>Add new Contact</h2>
      <Form handleSubmit={handleSubmit} newName={newName} handleInput={handleInput} newNumber={newNumber} handleNumber={handleNumber} />
      
      <h2>Numbers</h2>
      <Persons displayPersons={displayPersons} />
    </div>
  );
};

export default App;
