const Part = ({ part }) => {
  const { name, exercise } = part;
    return (
      <>
        <p>
          {name} {exercise}
        </p>
      </>
    );
}

export default Part;