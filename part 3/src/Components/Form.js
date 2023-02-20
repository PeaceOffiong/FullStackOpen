
const Form = ({handleSubmit, newName, handleInput, newNumber, handleNumber}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}

export default Form