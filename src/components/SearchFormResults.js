import { useState, useEffect } from "react";
import { Route } from "react-router";
import {
  getCharacterResults,
  getCharacterResultsWithQuery,
  getRickAndMortyEpisodes,
  getEpisodeNumber,
} from "../helpers/ApiHandlers";
import CharacterBox from "./CharacterBox";
import CharacterItem from "./CharacterItem";

const SearchFormResults = ({ searchQuery, setSearchQuery }) => {
  const [searchResults, setSearchResults] = useState({
    query: null,
    haveResults: false,
    items: [],
  });
  const [episodeList, setEpisodeList] = useState(new Array());
  const [searchState, setSearchState] = useState("ready");
  const pendingTimeLimit = 7000;

  let selectedIndex = null;
  if (searchResults.haveResults) {
    searchResults.items.forEach((character, index) => {
      if (searchQuery.character == character.id) selectedIndex = index;
    });
  }

  const pushNextPageResults = async () => {
    try {
      setSearchState("busy");
      const newSearchResults = await getCharacterResults(
        searchResults.nextUrl,
        pendingTimeLimit
      );
      newSearchResults.items = [
        ...searchResults.items,
        ...newSearchResults.items,
      ];

      setSearchResults({ ...searchResults, ...newSearchResults });
      setSearchState("ready");
    } catch (error) {
      setSearchState("error");
      console.error(error.message);
    }
  };

  useEffect(async () => {
    if (searchQuery.query) {
      try {
        setSearchState("busy");
        const results = await getCharacterResultsWithQuery(
          searchQuery.query,
          pendingTimeLimit
        );
        setSearchResults(results);
        setSearchState("ready");
      } catch (error) {
        setSearchState("error");
        console.error(error.message);
      }
    }
  }, [searchQuery.query]);

  useEffect(async () => {
    if (searchQuery.character) {
      try {
        setEpisodeList(
          await getRickAndMortyEpisodes(
            getEpisodeNumber(searchResults.items[selectedIndex].episode)
          )
        );
      } catch (error) {
        console.error(error.message);
      }
    }
  }, [searchQuery.character]);

  return (
    <section id="search-results">
      {searchQuery.query ? (
        searchResults.haveResults ? (
          <>
            <ul>
              {searchResults.items.map((character, index) => (
                <li
                  key={`character-${index}`}
                  id={selectedIndex == index ? "selected-result" : null}
                >
                  {selectedIndex === index ? (
                    <CharacterBox
                      character={searchResults.items[selectedIndex]}
                      episodeList={episodeList}
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                    />
                  ) : (
                    <CharacterItem
                      character={character}
                      index={index}
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                    />
                  )}
                </li>
              ))}
              {searchResults.nextUrl && (
                <button onClick={pushNextPageResults}>See More</button>
              )}
            </ul>
          </>
        ) : searchState === "ready" ? (
          <div className="g-message">
            <p>Your search has yielded no results. Try something different</p>
          </div>
        ) : (
          <span> Loading </span>
        )
      ) : (
        "No search has been made yet"
      )}
    </section>
  );
};

export default SearchFormResults;
