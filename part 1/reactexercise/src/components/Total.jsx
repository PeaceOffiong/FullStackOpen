const Total = ({ parts }) => {

  const totalSum = () => {
    let total = 0
    parts.map((part) => {
      total += part.exercises
    })
    return total;
  }
  return (
    <>
      <p>
        {`Number of exercises ${totalSum()}`}
      </p>
    </>
  );
};

export default Total;
