import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <div>
      <h1>Web Development Curriculum</h1>
      <section>
        <Header course={course[0].name} />
        <Content parts={course[0].parts} />
        <Total parts={course[0].parts} />
      </section>
      <section>
        <Header course={course[1].name} />
        <Content parts={course[1].parts} />
        <Total parts={course[1].parts} />
      </section>
    </div>
  );
};

export default Course;
