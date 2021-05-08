import { Link } from 'react-router-dom';
import SearchFormHeaderBar from './SearchFormHeaderBar';

import '../styles/index.scss';
import logo from '../images/rick-and-morty-logo.png';


const SearchFormHeader = ({ searchQuery, setSearchQuery }) => {
  return (
  	<>
			<header id={(searchQuery.query) ? "header" : "welcome"} >
				<div id="logo-container">
					<Link to="/">
						<img src={logo} alt="Rick and Morty logo" />
					</Link>
				</div>
				<div id="search-container">
					<SearchFormHeaderBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
				</div>
			</header>
  	</>
  );
};

export default SearchFormHeader;
