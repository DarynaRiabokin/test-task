import PropTypes from "prop-types";
import { useContext } from "react";
import { GameStateContext } from "../App";

function UserSelect(props) {
  const { handlePlayerTurn, matchesLeft } = props;

  const {
    settings: { m },
  } = useContext(GameStateContext);

  if (matchesLeft === 0) {
    return null;
  }

  const createPlayerTurnHandler = (chosenNumber) => {
    return () => {
      if (chosenNumber <= matchesLeft) {
        handlePlayerTurn(chosenNumber);
      }
    };
  };

  return (
    <>
      {[...Array(m).keys()].map((index) => (
        <button key={index} onClick={createPlayerTurnHandler(index + 1)}>
          Choose {index + 1}
        </button>
      ))}
    </>
  );
}

UserSelect.propTypes = {
  matchesLeft: PropTypes.number.isRequired,
  handlePlayerTurn: PropTypes.func.isRequired,
};

export default UserSelect;
