
const TotalExcercises = ({ parts }) => {
    const totalExecises = parts.reduce((accumulator, part) => {
        const sum = accumulator + part.exercises;
        return sum;
    }, 0)

  return (
      <h4>Total Execersis of { totalExecises }</h4>
  )
}

export default TotalExcercises;