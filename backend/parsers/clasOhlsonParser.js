const { getPage } = require("./helpers/playwright");
const { parsePrice } = require("./helpers/parsePrice");
const { validateProduct } = require("./helpers/validateProduct");

const parse = async (url) => {
  const { browser, page } = await getPage(url);

  try {
    const titleLocator = page.locator("h1");
    const title = await titleLocator.first().textContent();

    const priceSelector = await page.locator(".product__discount-price, .product__price-value").first().textContent();
    const price = parsePrice(priceSelector);

    const image = await page.locator(".js-pdp-main-img .zoomImg").first().getAttribute("src");
    const store = "Clas Ohlson";

    validateProduct(title, price, image);
    return { title, price, image, store };
  } finally {
    await browser.close();
  }
};

module.exports = { parse };
