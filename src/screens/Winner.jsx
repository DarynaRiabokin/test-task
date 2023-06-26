import { useContext } from "react";
import { GameStateContext } from "../App";
import CSS from "./Winner.module.css";

const Winner = () => {
  const {
    endGameStatus: { playerMatches, computerMatches },
  } = useContext(GameStateContext);
  const winnerName = playerMatches % 2 === 0 ? "Player" : "Computer";

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className={CSS.container}>
      <strong className={CSS.winnerText}>
        {playerMatches === computerMatches
          ? "Drown Game"
          : `${winnerName} Wins`}
      </strong>
      <span className={CSS.result}>Player matches: {playerMatches}</span>
      <span className={CSS.result}>Computer matches: {computerMatches}</span>
      <button onClick={handleRestart}>Restart Game</button>
    </div>
  );
};

export default Winner;
