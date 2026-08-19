const stores = [
  { domain: "webhallen.com", parser: require("./webhallenParser").parse },
  { domain: "ahlens.se", parser: require("./ahlensParser").parse },
  { domain: "elgiganten.se", parser: require("./elgigantenParser").parse },
  { domain: "kjell.com", parser: require("./kjellCompanyParser").parse },
  { domain: "clasohlson.com", parser: require("./clasOhlsonParser").parse },
  { domain: "ikea.com", parser: require("./ikeaParser").parse },
  { domain: "lagerhaus.se", parser: require("./lagerhausParser").parse },
  { domain: "stadium.se", parser: require("./stadiumParser").parse },
  { domain: "apotea.se", parser: require("./apoteaParser").parse },
  { domain: "cervera.se", parser: require("./cerveraParser").parse },
];

const parse = async (url) => {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    throw new Error("Invalid URL.");
  }

  const parsedUrl = new URL(url);
  if (parsedUrl.pathname === "/") {
    throw new Error("Invalid URL.");
  }

  const store = stores.find((store) => url.includes(store.domain));
  if (store) {
    return await store.parser(url);
  }
  throw new Error("This store is not supported yet.");
};

module.exports = { parse };
