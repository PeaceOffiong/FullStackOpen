import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const ancedotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const points = [0, 0, 0, 0, 0, 0, 0, 0]
  
  const [selected, setSelected] = useState(0);
  const [vote, setVotes] = useState(points);

  const generateRandom = () => {
    const selected = Math.floor(Math.random() * ancedotes.length);
    setSelected(selected);
  };

  const setVoteCount = (selected) => {
    let copy = [...vote];
    copy[selected] += 1;
    setVotes(copy);
  };

  const highestVoteAncedote = () => {
    const max = Math.max(...vote);
    const ancedote = vote.indexOf(max);
    console.log(ancedote)
    return ancedotes[ancedote];
  }

  useEffect(() => {
    generateRandom();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>
        "{ancedotes[selected]}" <span>has {vote[selected]} votes</span>
      </p>
      <button onClick={() => generateRandom()}>Next Ancedote</button>
      <button onClick={() => setVoteCount(selected)}>Vote</button>

      <h2>Ancedote with the largest vote</h2>
      <p>{highestVoteAncedote()}</p>
    </div>
  );
}

export default App;
