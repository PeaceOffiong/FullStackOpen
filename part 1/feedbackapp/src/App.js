import { useState } from "react";
import Statistics from "./Statistics";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const averageScore = (good, neutral, bad) => {
    const sum = good + neutral + bad;
    const average = sum / 3;
    return average
  }

  const positivePercentage = (good, neutral, bad) => {
    const sum = good + neutral + bad;
    const percentage = good / sum * 100;
    return percentage;
  }

  return (
    <div className="App">
      <h2>Give feedback</h2>
      <div className="btn-container">
        <button onClick={() => setGood(good + 1)}>Good </button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
        <button onClick={() => setBad(bad + 1)}>Bad</button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} averageScore={averageScore} positivePercentage={positivePercentage}/>
      
    </div>
  );
}

export default App;
