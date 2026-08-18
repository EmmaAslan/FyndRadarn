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

    const image = await page.locator('[data-type="MAIN_PRODUCT_IMAGE"] img').first().getAttribute("src");
    const store = "IKEA";

    validateProduct(title, price, image);
    return { title, price, image, store };
  } finally {
    await browser.close();
  }
};

module.exports = { parse };
