const CharacterItem = ({ character, searchQuery, setSearchQuery }) => {
  const setSelectedChar = () => {
    setSearchQuery({ ...searchQuery, character: character.id });
  };

  return (
    <div className="character-item" onClick={setSelectedChar}>
      <img
        src="https://rickandmortyapi.com/api/character/avatar/19.jpeg"
        alt={character.name}
      />

      <div className="description">
        <h3> {character.name} </h3>

        <ul>
          <li className="species"> {character.species} </li>
          <li className="status"> {character.status} </li>
        </ul>
      </div>
    </div>
  );
};

export default CharacterItem;
