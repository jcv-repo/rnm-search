const getUrlParams = (selectedParam) => {
  const regResults = (param) => {
    const regex = new RegExp("[?&]" + param + "=([^&#]*)", "g");
    return Array.from(window.location.href.matchAll(regex));
  };

  let param;

  if (selectedParam) {
    const results = regResults(selectedParam);

    if (results.length === 0) {
      return null;
    } else {
      return regResults(selectedParam)[0][1];
    }
  } else {
    const results = regResults("(\\w+)");

    if (results.length === 0) {
      return null;
    } else {
      const urlParams = new Object();

      results.forEach((result, index) => {
        urlParams[results[index][1]] = results[index][2];
      });

      return urlParams;
    }
  }
};

const getNewParamsString = (params) => {
  const currentParams = getUrlParams();

  if (typeof params === "object" && params !== null) {
    let newParams;

    if (currentParams) newParams = { ...currentParams, ...params };
    else newParams = params;

    let paramsString = "?";
    // const baseUrl = /^[^?]+/g.exec(window.location.href)[0];

    for (const param in newParams) {
      if (newParams[param]) {
        let ampersand = "&";
        if (paramsString.slice(-1) === "?") ampersand = "";

        paramsString =
          paramsString + ampersand + param + "=" + newParams[param];
      }
    }

    return paramsString;
  } else {
    console.log(
      "You need to provide an object as an argument in setUrlParams, URL unchanged"
    );
  }
};

export { getUrlParams, getNewParamsString };
