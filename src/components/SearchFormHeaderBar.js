import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getNewParamsString } from "../helpers/getUrlParams";

import { ReactComponent as SearchIcon } from "../icons/search_icon.svg";

const SearchFormHeaderBar = ({ searchQuery, setSearchQuery }) => {
  const [userInput, setUserInput] = useState(
    searchQuery.query ? searchQuery.query : "" // Inputs can't be null
  );
  const history = useHistory();

  const inputHandle = (inputEvent) => {
    setUserInput(inputEvent.target.value);
  };
  const inputEnterHandle = (event) => {
    if (event.key == "Enter") indexUpdate();
  };

  const indexUpdate = () => {
    setSearchQuery({ ...searchQuery, query: userInput });
    history.push({ search: getNewParamsString({ q: userInput }) });
  };

  useEffect(() => {
    if (searchQuery.query) setUserInput(searchQuery.query);
  }, [searchQuery]);

  return (
    <div className="g-searchbox">
      <input
        value={userInput}
        onChange={inputHandle}
        onKeyPress={inputEnterHandle}
      />
      <SearchIcon onClick={indexUpdate} />
    </div>
  );
};

export default SearchFormHeaderBar;
