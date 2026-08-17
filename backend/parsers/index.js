const stores = [
  { domain: "webhallen.com", parser: require("./webhallenParser").parse },
  { domain: "ahlens.com", parser: require("./ahlensParser").parse },
  { domain: "elgiganten.se", parser: require("./elgigantenParser").parse },
  { domain: "kjell.com", parser: require("./kjellCompanyParser").parse },
  { domain: "clasohlson.com", parser: require("./clasOhlsonParser").parse },
  { domain: "ikea.com", parser: require("./ikeaParser").parse },
  { domain: "lagerhaus.se", parser: require("./lagerhausParser").parse },
];

const parse = async (url) => {
  const store = stores.find((store) => url.includes(store.domain));
  if (store) {
    return await store.parser(url);
  }
  throw new Error("This store is not supported yet.");
};

module.exports = { parse };
