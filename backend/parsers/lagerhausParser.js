const { getPage } = require("./helpers/playwright");
const { parsePrice } = require("./helpers/parsePrice");
const { validateProduct } = require("./helpers/validateProduct");

const parse = async (url) => {
  const { browser, page } = await getPage(url);

  try {
    const titleLocator = page.locator("[data-testid='product-title']");
    const title = await titleLocator.first().textContent();

    const priceSelector = await page.locator(".price.n77d0ua").first().textContent();
    const price = parsePrice(priceSelector);

    const imageUrl = await page.locator('img[src*="/pub_images/original/"]').first().getAttribute("src");
    const image = imageUrl.split("?")[0];
    const store = "Lagerhaus";

    validateProduct(title, price, image);
    return { title, price, image, store };
  } finally {
    await browser.close();
  }
};

module.exports = { parse };
