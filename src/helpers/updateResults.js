const updateResults = async (searchIndex, searchResults, setSearchResults) => {
	
	const apiTargetUrl = `https://rickandmortyapi.com/api/character/?name=${searchIndex}`;
	const response = await fetch(apiTargetUrl);
	
	if (response.ok){
		const data = await response.json();
		const results = data.results;
		results.nextUrl = data.info.next;
		results.selectedChar = null;
		
		setSearchResults(results);
			
	} else {
		console.log(`error ${response.status}, try again`);
		
	}
}

export default updateResults
