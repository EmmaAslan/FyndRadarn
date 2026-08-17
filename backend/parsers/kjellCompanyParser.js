const { getPage } = require("./helpers/playwright");
const { parsePrice } = require("./helpers/parsePrice");
const { validateProduct } = require("./helpers/validateProduct");

const parse = async (url) => {
  const { browser, page } = await getPage(url);

  try {
    const productData = JSON.parse(await page.locator('script[type="application/ld+json"]').first().textContent());

    const title = productData.name;
    const price = productData.offers.price;

    validateProduct(title, price);
    return { title, price };
  } finally {
    await browser.close();
  }
};

module.exports = { parse };
