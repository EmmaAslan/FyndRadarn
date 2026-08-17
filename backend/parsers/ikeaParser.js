const { getPage } = require("./helpers/playwright");
const { parsePrice } = require("./helpers/parsePrice");
const { validateProduct } = require("./helpers/validateProduct");

const parse = async (url) => {
  const { browser, page } = await getPage(url);

  try {
    const titleLocator = page.locator("h1");
    const title = await titleLocator.first().textContent();

    const priceSelector = await page.locator(".pipcom-price__nowrap").first().textContent();
    const price = parsePrice(priceSelector);

    validateProduct(title, price);
    return { title, price };
  } finally {
    await browser.close();
  }
};

module.exports = { parse };
