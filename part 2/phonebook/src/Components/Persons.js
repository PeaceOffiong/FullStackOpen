const Persons = ({ displayPersons }) => {
  if (!displayPersons) {
    return <h1>Loading ...</h1>;
  }
  return (
    <>
      {displayPersons.map((person, index) => {
        return (
          <li key={index}>
            {person.name} {person.number}
          </li>
        );
      })}
    </>
  );
};

export default Persons;
