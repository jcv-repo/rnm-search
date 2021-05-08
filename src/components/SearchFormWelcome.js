import SearchFormHeaderBar from './SearchFormHeaderBar';

import '../styles/index.scss'
import logo from '../images/rick-and-morty-logo.png';


const SearchFormWelcome = ({ searchIndex, setSearchIndex }) => {
  return (
  	<header id="welcome">
  		<div id="logo-container">
  			<img src={logo} alt="Rick and Morty logo" />
  		</div>
  		<div id="search-container">
  			<SearchFormHeaderBar searchIndex={searchIndex} setSearchIndex={setSearchIndex} />
  		</div>
  	</header>
  );
};

export default SearchFormWelcome;
