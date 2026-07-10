const parse = async (url) => {
  const data = {
    title: "ASUS ROG Strix XG27AQDMES",
    price: 5490,
  };

  console.log("Parsing Webhallen URL:", url);
  console.log("Parsed Data:", data);

  return data;
};

module.exports = { parse };
