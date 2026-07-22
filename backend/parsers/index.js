const { parse: parseWebhallen } = require("./webhallenParser");

const parse = async (url) => {
  if (url.includes("webhallen")) {
    return await parseWebhallen(url);
  } 
  
  throw new Error("This store is not supported yet.")
};

module.exports = { parse };