import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useKeypress from "../helpers/useKeypress";
import { getNewParamsString } from "../helpers/getUrlParams";

const CharacterBox = ({ character, searchQuery, setSearchQuery }) => {
  const history = useHistory();
  const setSelectedCharNull = () => {
    setSearchQuery({ ...searchQuery, character: null });
  };

  useKeypress("Escape", setSelectedCharNull);

  useEffect(() => {
    history.push({
      search: getNewParamsString({
        character: searchQuery.character,
      }),
    });

    return () => {
      history.push({
        search: getNewParamsString({
          character: null,
        }),
      });
    };
  }, []);

  return (
    <div id="character-box">
      <img src={character.image} alt={character.name} />

      <ul>
        <li> {character.name} </li>
        <li> {character.species} </li>
        <li> {character.gender} </li>
        <li> {character.status} </li>
      </ul>

      <div id="close-charbox" onClick={setSelectedCharNull}>
        X
      </div>
    </div>
  );
};

export default CharacterBox;
