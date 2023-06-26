import { createContext, useState, lazy, Suspense } from "react";
const Setup = lazy(() => import('./screens/Setup'));
const Game = lazy(() => import('./screens/Game'));
const Winner = lazy(() => import('./screens/Winner'));

export const GameStateContext = createContext(null);

const App = () => {
  const [settings, setSettings] = useState({
    n: 12,
    m: 3,
    status: "setup",
  });
  const [gameMode, setGameMode] = useState("player");
  const [endGameStatus, setEndGameStatus] = useState({
    playerMatches: 0,
    computerMatches: 0,
  });

  return (
    <div>
      <GameStateContext.Provider
        value={{
          settings,
          setSettings,
          gameMode,
          setGameMode,
          endGameStatus,
          setEndGameStatus,
        }}
      >
        <Suspense fallback={null}>
          {settings.status === "setup" && <Setup />}
          {settings.status === "game" && <Game />}
          {settings.status === "result" && <Winner />}
        </Suspense>
      </GameStateContext.Provider>
    </div>
  );
};

export default App;
