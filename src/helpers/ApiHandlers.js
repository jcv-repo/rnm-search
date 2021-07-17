const baseUrl = "https://rickandmortyapi.com/api/";
const characterApiUrl = "character/?name=";
const episodeApiUrl = "episode/";

const fetchWithTimeout = async (url, timeLimit = 0) => {
  const controller = new AbortController();
  let timeout;
  if (timeLimit !== 0) {
    timeout = setTimeout(() => controller.abort(), timeLimit);
  }
  const response = await fetch(url, { signal: controller.signal });
  if (timeLimit !== 0) clearTimeout(timeout);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Data could not be fetched. Probably no results");
  }
};

const getCharacterResults = async (url, timeLimit = 0) => {
  const formatCharacterResults = (data = {}) => {
    const results = new Object();
    results.items = data.results ? data.results : [];
    results.haveResults = data.results ? true : false;
    if (data.info) results.nextUrl = data.info.next ? data.info.next : null;
    return results;
  };

  try {
    const results = await fetchWithTimeout(url, timeLimit);
    return formatCharacterResults(results);
  } catch (error) {
    switch (error.name) {
      case "AbortError":
        throw new Error(error.message + "Could it be a connection error?");
      case "TypeError":
        throw new Error("There might be a connection error");
      default:
        return formatCharacterResults();
    }
  }
};

const getCharacterResultsWithQuery = async (query, timeLimit) => ({
  ...(await getCharacterResults(baseUrl + characterApiUrl + query, timeLimit)),
  query: query,
});

const getRickAndMortyEpisodes = async (episodeList, timeLimit) => {
  let query = baseUrl + episodeApiUrl;
  if (episodeList) {
    if (Array.isArray(episodeList)) {
      if (episodeList.length !== 0) {
        episodeList.forEach((episode, index) => {
          if (!isNaN(episode)) {
            query = query + (index > 0 ? "," : "") + episode;
          } else {
            throw TypeError(episode + " is not a Number");
          }
        });
      } else {
        throw TypeError(episodeList + " is an empty Array");
      }
    } else {
      if (!isNaN(episodeList)) {
        query = query + episodeList;
      } else {
        throw new TypeError(episodeList + " is not a Number");
      }
    }
  } else {
    throw new TypeError(
      "You need to provide at least one argument with a number or an array of numbers"
    );
  }
  try {
    const result = await fetchWithTimeout(query, timeLimit);
    if (Array.isArray(result)) return result;
    else return [result];
  } catch (error) {
    switch (error.name) {
      case "AbortError":
        throw new Error(error.message + "Could it be a connection error?");
      case "TypeError":
        throw new Error("There might be a connection error");
      default:
        return [];
    }
  }
};

const getEpisodeNumber = (episodeUrl) => {
  const matchEpNumber = (url) => /\/api\/episode\/(\d+)/g.exec(url)[1];
  if (Array.isArray(episodeUrl)) {
    let episodeList = new Array();
    episodeUrl.forEach((url) => {
      const episode = matchEpNumber(url);
      if (episode !== null) episodeList.push(episode);
    });
    return episodeList.length === 0 ? null : episodeList;
  } else {
    return matchEpNumber(episodeUrl);
  }
};

export {
  getCharacterResults,
  getCharacterResultsWithQuery,
  getRickAndMortyEpisodes,
  getEpisodeNumber,
};
