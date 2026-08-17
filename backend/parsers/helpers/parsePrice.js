const parsePrice = (priceSelector) => {
  const normalizedPrice = priceSelector
    .replace(/\s/g, "")
    .replace(",", ".")
    .replace(/[^\d.]/g, "");

  return parseFloat(normalizedPrice);
};

module.exports = { parsePrice };
