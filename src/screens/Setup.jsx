import { useContext } from "react";
import { GameStateContext } from "../App";
import CSS from "./Setup.module.css";

const Setup = () => {
  const { setGameMode, gameMode, settings, setSettings } =
    useContext(GameStateContext);

  const handleN = (event) => {
    setSettings((state) => ({
      ...state,
      n: +event.target.value,
    }));
  };

  const handleM = (event) => {
    setSettings((state) => ({
      ...state,
      m: +event.target.value,
    }));
  };

  const handleGameMode = (event) => {
    setGameMode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSettings((state) => ({
      ...state,
      status: "game",
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={CSS.container}>
      <h1>Setup</h1>
      <div className={`${CSS.formGroup} ${CSS.field}`}>
        <input
          type="number"
          className={CSS.formField}
          placeholder="N"
          name="n"
          id="n"
          min={1}
          max={100}
          onChange={handleN}
          value={settings.n}
        />
        <label htmlFor="n" className={CSS.formLabel}>
          N
        </label>
      </div>
      <div className={`${CSS.formGroup} ${CSS.field}`}>
        <input
          type="number"
          className={CSS.formField}
          placeholder="M"
          name="m"
          id="m"
          min={1}
          max={2 * settings.n}
          onChange={handleM}
          value={settings.m}
        />
        <label htmlFor="m" className={CSS.formLabel}>
          M
        </label>
      </div>
      <div className={`${CSS.formGroup} ${CSS.field}`}>
        <select
          id="select"
          className={CSS.formField}
          value={gameMode}
          onChange={handleGameMode}
        >
          <option value="player">Player</option>
          <option value="computer">Computer</option>
        </select>
        <label htmlFor="select" className={CSS.formLabel}>
          First turn
        </label>
      </div>
      <button type="submit">Start Game</button>
    </form>
  );
};

export default Setup;
