const validateProduct = (title, price, image) => {
  if (!title || !Number.isFinite(price) || price <= 0 || !image) {
    throw new Error("Could not find product information.");
  }
};

module.exports = { validateProduct };