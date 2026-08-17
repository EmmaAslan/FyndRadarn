const validateProduct = (title, price) => {
  if (!title || !Number.isFinite(price) || price <= 0) {
    throw new Error("Could not find product information.");
  }
};

module.exports = { validateProduct };