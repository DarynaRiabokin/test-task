import { useContext, useEffect, useState } from "react";
import UserSelect from "../components/UserSelect";
import Loading from "../components/Loading";
import { GameStateContext } from "../App";
import matchImage from "../assets/match.png";
import CSS from "./Game.module.css";

const Game = () => {
  const { settings, gameMode, setSettings, setEndGameStatus } =
    useContext(GameStateContext);
  const { n, m } = settings;
  const [isComputerTurn, setComputerTurn] = useState(gameMode === "computer");
  const [matchesLeft, setMatchesLeft] = useState(2 * n + 1);
  const [playerMatches, setPlayerMatches] = useState(0);
  const [computerMatches, setComputerMatches] = useState(0);

  const handlePlayerTurn = (numMatches) => {
    setPlayerMatches(playerMatches + numMatches);
    setMatchesLeft(matchesLeft - numMatches);

    if (matchesLeft - numMatches > 0) {
      setComputerTurn(true);
    }
  };

  const handleComputerTurn = () => {
    let computerNumMatches = 0;

    if (matchesLeft <= m) {
      for (let i = 1; 1 <= matchesLeft; i++) {
        computerNumMatches = i;

        if ((computerNumMatches + i) % 2 === 0) {
          break;
        }
      }
    } else {
      computerNumMatches = (matchesLeft - 1) % (m + 1);

      if (computerNumMatches === 0) {
        computerNumMatches = m;
      }
    }

    setComputerMatches(computerMatches + computerNumMatches);
    setMatchesLeft(matchesLeft - computerNumMatches);
    setComputerTurn(false);
  };

  useEffect(() => {
    if (matchesLeft === 0) {
      setSettings((state) => ({
        ...state,
        status: "result",
      }));
      setEndGameStatus({
        computerMatches,
        playerMatches,
      });
    }
  }, [matchesLeft, computerMatches, playerMatches, setSettings, setEndGameStatus]);

  useEffect(() => {
    if (isComputerTurn) {
      setTimeout(() => {
        handleComputerTurn();
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComputerTurn]);

  return (
    <div className={CSS.container}>
      <div className={CSS.computer}>
        <span>Computer Matches: {computerMatches}</span>
        {[...Array(computerMatches).keys()].map((index) => (
          <div key={index} className={CSS.match}>
            <img src={matchImage} />
          </div>
        ))}
      </div>
      <div className={CSS.playerWrapper}>
        <div className={CSS.buttons}>
          {isComputerTurn ? (
            <Loading />
          ) : (
            <UserSelect
              matchesLeft={matchesLeft}
              handlePlayerTurn={handlePlayerTurn}
            />
          )}
        </div>
        <div className={CSS.player}>
          <span>Computer Matches: {playerMatches}</span>
          {[...Array(playerMatches).keys()].map((index) => (
            <div key={index} className={CSS.match}>
              <img src={matchImage} />
            </div>
          ))}
        </div>
      </div>
      <div className={CSS.pileContainer}>
        <i className={CSS.pile} />
        <span className={CSS.matchCount}>{matchesLeft}</span>
      </div>
    </div>
  );
};

export default Game;
