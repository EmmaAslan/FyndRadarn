const stores = [
  { domain: "webhallen.com", name: "Webhallen", parser: require("./webhallenParser").parse },
  { domain: "ahlens.se", name: "Ahlens", parser: require("./ahlensParser").parse },
  { domain: "elgiganten.se", name: "Elgiganten", parser: require("./elgigantenParser").parse },
  { domain: "kjell.com", name: "Kjell & Company", parser: require("./kjellCompanyParser").parse },
  { domain: "clasohlson.com", name: "Clas Ohlson", parser: require("./clasOhlsonParser").parse },
  { domain: "ikea.com", name: "IKEA", parser: require("./ikeaParser").parse },
  { domain: "lagerhaus.se", name: "Lagerhaus", parser: require("./lagerhausParser").parse },
  { domain: "stadium.se", name: "Stadium", parser: require("./stadiumParser").parse },
  { domain: "apotea.se", name: "Apotea", parser: require("./apoteaParser").parse },
  { domain: "cervera.se", name: "Cervera", parser: require("./cerveraParser").parse },
  { domain: "bauhaus.se", name: "Bauhaus", parser: require("./bauhausParser").parse },
  { domain: "amazon.se", name: "Amazon", parser: require("./amazonParser").parse },
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
    const result = await store.parser(url);

    return {
      ...result,
      store: store.name,
    };
  }
  throw new Error("This store is not supported yet.");
};

module.exports = { parse, stores };
