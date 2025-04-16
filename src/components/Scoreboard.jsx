import '../style/Scoreboard.css';

export default function Scoreboard({ score, maxScore, maxPossible }) {
  return (
    <table className="gameScore">
      <tbody>
        <tr>
          <th>Current Score</th>
          <td>{score}</td>
        </tr>
        <tr>
          <th>Max Score</th>
          <td>
            {maxScore} {maxPossible && `(${maxPossible})`}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
