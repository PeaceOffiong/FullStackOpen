import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [NotificationM, setNotificationM] = useState(null);
  const [color, setColor] = useState("");
  const [displayPersons, setDisplayPersons] = useState([...persons]);

  const fetchPersons = async () => {
    const response = await axios.get("http://localhost:3007/api/contacts");
    setPersons(response.data);
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  useEffect(() => {
    if (filter === "") {
      setDisplayPersons(persons);
    } else {
      const filtered = persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );
      setDisplayPersons(filtered);
    }
  }, [filter, persons]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post("http://localhost:3007/api/contacts", { name: newName, number: newNumber })
      .then((response) => {
        setPersons([...persons, response.data]);
        setNotificationM({ message: "Contact successfully Added" });
        setColor("green");
        setTimeout(() => {
          setNotificationM(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        // Refresh contacts list to ensure state is in sync with backend
        fetchPersons();
        if (error.response && error.response.data && error.response.data.error) {
          setNotificationM({ message: error.response.data.error });
        } else {
          setNotificationM({ message: "Error adding contact" });
        }
        setColor("red");
        setTimeout(() => {
          setNotificationM(null);
        }, 5000);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification NotificationM={NotificationM} color={color} />
      <Filter filter={filter} setFilter={setFilter} />

      <Form
        newName={newName}
        setNewName={setNewName} 
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <Persons
        displayPersons={displayPersons}
        setDisplayPersons={setDisplayPersons}
        setPersons={setPersons}
        setNotificationM={setNotificationM}
        setColor={setColor}
      />
    </div>
  );
};

export default App;

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      <h3>Filter shown with</h3>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

const Form = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  handleSubmit,
}) => {
  return (
    <div>
      <h3>Add new Contact</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
      </form>
      <div>
        number:
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          add
        </button>
      </div>
    </div>
  );
};

const Persons = ({ displayPersons, setDisplayPersons, setPersons, setNotificationM, setColor }) => {
  const deletePerson = (id) => {
    if (!id && id !== 0) {
      setNotificationM({ message: "C" });
      setColor("red");
      setTimeout(() => {
        setNotificationM(null);
      }, 5000);
      return;
    }
    // Ensure id is a valid string or number
    const personId = String(id).trim();
    const person = displayPersons.find((person) => String(person.id) === personId || person.id === id);
    if (!person) {
      return;
    }
    const deleteUrl = `http://localhost:3007/api/contacts/${personId}`;
    window.confirm(`Do You Really want to delete ${person.name}?`) &&
      axios.delete(deleteUrl).then((response) => {
        const idToDelete = personId;
        setPersons((prevPersons) => prevPersons.filter((person) => String(person.id) !== idToDelete && person.id !== id));
        setDisplayPersons((prevDisplay) => prevDisplay.filter((person) => String(person.id) !== idToDelete && person.id !== id));
        setNotificationM({ message: "Contact Deleted" });
        setColor("red");
        setTimeout(() => {
          setNotificationM(null);
        }, 5000);
      }).catch((error) => {
        setNotificationM({ message: "Error deleting contact" });
        setColor("red");
        setTimeout(() => {
          setNotificationM(null);
        }, 5000);
      });
  };
  return (
    <div>
      <h3>Numbers</h3>
      {displayPersons.map((person) => (
        <div key={person.id || person.name}>
          {person.name} {person.number}
          {person.id ? (
            <button onClick={() => deletePerson(person.id)}>Delete</button>
          ) : (
            <span style={{ color: 'red', marginLeft: '10px' }}>(No ID - cannot delete)</span>
          )}
        </div>
      ))}
    </div>
  );
};

const Notification = ({ NotificationM, color }) => {
  if (NotificationM === null) {
    return;
  } else {
    return <div className={color} style={{ color: color, border: `4px solid ${color}`, height: "30px", borderRadius: "3px", backgroundColor: "lightgray", display: "flex", alignItems: "center", justifyContent: "center" }}>{NotificationM.message}</div>;
  }
};