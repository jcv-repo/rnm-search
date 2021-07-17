import { Link } from "react-router-dom";
import { ThemeContext } from "../styles/themes";
import SearchFormHeaderBar from "./SearchFormHeaderBar";
import LightOrDarkThemeToggle from "./LightOrDarkThemeToggle";

import logo from "../images/rick-and-morty-search-320.png";

const SearchFormHeader = ({ searchQuery, setSearchQuery }) => {
  return (
    <>
      <header id={searchQuery.query ? "header" : "welcome"}>
        <div id="logo-container">
          <Link to="/">
            <img src={logo} alt="Rick and Morty logo" />
          </Link>
        </div>
        <div id="search-container">
          <SearchFormHeaderBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <ThemeContext.Consumer>
          {({ theme, toggleTheme }) => (
            <LightOrDarkThemeToggle theme={theme} toggleTheme={toggleTheme} />
          )}
        </ThemeContext.Consumer>
      </header>
    </>
  );
};

export default SearchFormHeader;
