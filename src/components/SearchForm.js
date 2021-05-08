import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getUrlParams, getNewParamsString } from "../helpers/getUrlParams";
import SearchFormHeader from "./SearchFormHeader";
import SearchFormResults from "./SearchFormResults";

const SearchForm = () => {
  var getInitialQueryState = () => {
    const urlParams = getUrlParams() || {};
    const state = {
      query: urlParams.q ? urlParams.q : null,
      character: urlParams.character ? urlParams.character : null,
    };

    return state;
  };

  const [searchQuery, setSearchQuery] = useState(getInitialQueryState());
  const location = useLocation();

  /* 
	useEffect(() => {
		
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		};
    
    
		if ( searchQuery.query && searchQuery.query != getUrlParams('q') ||
		searchQuery.character != getUrlParams('character') ) {
			history.push({ search : getNewParamsString({ 
				q : searchQuery.query, character : searchQuery.character }) 
			});
    };
    
    
  }, [ searchQuery ]);	// previously [searchQuery, history]
	*/

  useEffect(() => {
    const urlParams = getUrlParams() || {};

    if (
      searchQuery.query != urlParams.q ||
      searchQuery.character != urlParams.character
    ) {
      setSearchQuery({
        ...searchQuery,
        query: urlParams.q,
        character: urlParams.character,
      });
    }

    console.log(searchQuery.query);
  }, [location]);

  return (
    <>
      <SearchFormHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {searchQuery.query && (
        <SearchFormResults
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
    </>
  );
};

export default SearchForm;
