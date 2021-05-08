import { useState, useEffect } from "react";
import CharacterBox from "./CharacterBox";
import CharacterItem from "./CharacterItem";

const SearchFormResults = ({ searchQuery, setSearchQuery }) => {
  const [searchResults, setSearchResults] = useState(null);

  const pushNextResults = async () => {
    if (searchResults.nextUrl) {
      const response = await fetch(searchResults.nextUrl);

      if (response.ok) {
        const data = await response.json();
        const results = [...searchResults, ...data.results];
        results.nextUrl = data.info.next;
        setSearchResults(results);
      }
    }
  };

  useEffect(() => {
    if (searchQuery.query) {
      (async () => {
        const apiTargetUrl = `https://rickandmortyapi.com/api/character/?name=${searchQuery.query}`;
        const response = await fetch(apiTargetUrl);

        if (response.ok) {
          const data = await response.json();
          const results = data.results;
          results.nextUrl = data.info.next;

          setSearchResults(results);
        } else {
          console.log(`error ${response.status}, try again`);
        }
      })();
    }
  }, [searchQuery]);

  return (
    <section id="search-results">
      {searchQuery.query ? (
        searchResults ? (
          <>
            {searchQuery.character && (
              <CharacterBox
                character={searchQuery.character}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            )}

            <ul>
              {searchResults.map((character, index) => (
                <li
                  key={`character-${index}`}
                  id={
                    searchQuery.character == character.id
                      ? "selected-result"
                      : null
                  }
                >
                  <CharacterItem
                    character={character}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />
                </li>
              ))}
              {searchResults.nextUrl && (
                <button onClick={pushNextResults}>See More</button>
              )}
            </ul>
          </>
        ) : (
          <span> loading? </span>
        )
      ) : (
        "no search index"
      )}
    </section>
  );
};

export default SearchFormResults;
