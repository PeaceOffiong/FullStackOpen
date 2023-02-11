const Persons = ({ displayPersons, deletePerson }) => {
  if (!displayPersons) {
    return <h1>Loading ...</h1>;
  }
  return (
    <>
      {displayPersons.map((person, index) => {
        return (
          <li key={index}>
            {person.name} {person.number}
            <button onClick={() =>deletePerson(person.id)}>Delete</button>
          </li>
        );
      })}
    </>
  );
};

export default Persons;
