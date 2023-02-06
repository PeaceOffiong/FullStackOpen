import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => {
        return <Part part={part} key={ index} />;
      })}
    </>
  );
};

export default Content;
