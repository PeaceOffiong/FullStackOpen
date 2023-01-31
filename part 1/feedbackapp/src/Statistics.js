import StatisticsLine from "./StatisticsLine";

const Statistics = ({ good, neutral, bad, averageScore, positivePercentage }) => {
    
    if (good + neutral + bad === 0) {
        return <h3>No Feedback given</h3>
    }
  return (
    <>
      <h3>Statistics</h3>
      <table>
        <tbody>
          <StatisticsLine value={good} text="Good" />
          <StatisticsLine value={neutral} text="Neutral" />
          <StatisticsLine value={bad} text="Bad" />
          <tr>
            <td>Total</td>
            <td>{bad + good + neutral}</td>
          </tr>
          <tr>
            <td>Average Score</td>
            <td>{averageScore(good, neutral, bad)}</td>
          </tr>
          <tr>
            <td>Positive Percentage</td>
            <td>{positivePercentage(good, neutral, bad)}%</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Statistics