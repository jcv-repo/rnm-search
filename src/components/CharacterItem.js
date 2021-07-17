const CharacterItem = ({ character, index, searchQuery, setSearchQuery }) => {
  const setSelectedChar = () => {
    setSearchQuery({ ...searchQuery, character: character.id });
  };

  return (
    <div className="character-item" onClick={setSelectedChar}>
      <img src={character.image} alt={character.name} />

      <div>
        <h3> {character.name} </h3>

        <ul>
          <li className="species">{character.species}</li>
          <li className="status">
            {character.status === "unknown"
              ? "Unknown Status"
              : character.status}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CharacterItem;
