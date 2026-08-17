const { parse: parseWebhallen } = require("./webhallenParser");
const { parse: parseAhlens } = require("./ahlensParser");

const parse = async (url) => {
  if (url.includes("webhallen")) {
    return await parseWebhallen(url);
  } 
  if (url.includes("ahlens")) {
    return await parseAhlens(url);
  }
  
  throw new Error("This store is not supported yet.")
};

module.exports = { parse };