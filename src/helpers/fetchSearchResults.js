const fetchSearchResults = async (targetUrl) => {
  const response = await fetch(targetUrl);

  if (response.ok) {
    const data = await response.json();
    const results = data.results;
    results.nextUrl = data.info.next;

    return results;
  } else {
    return new Error();
  }
};

export default updateResults;
