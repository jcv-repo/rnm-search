import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getUrlParams } from "../helpers/GetUrlParams";
import SearchFormHeader from "./SearchFormHeader";
import SearchFormResults from "./SearchFormResults";
import "../styles/search.scss";

const SearchForm = () => {
  const params = getUrlParams() || {};
  const getStateFromParams = () => ({
    query: params.q || null,
    character: params.character || null,
  });
  const [searchQuery, setSearchQuery] = useState(getStateFromParams());
  const location = useLocation();

  useEffect(() => {
    console.log(params);
    if (
      params.q != searchQuery.query ||
      params.character != searchQuery.character
    ) {
      setSearchQuery(getStateFromParams());
    }
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
