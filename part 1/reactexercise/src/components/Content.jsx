import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return <Part part={part} />
      })}
    </>
  );
}

export default Content