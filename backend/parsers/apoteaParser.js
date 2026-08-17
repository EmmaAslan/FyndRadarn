const { getPage } = require("./helpers/playwright");
const { parsePrice } = require("./helpers/parsePrice");

const parse = async (url) => {
  const { browser, page } = await getPage(url);

  try {
    const titleLocator = page.locator("h1");
    const title = await titleLocator.first().textContent();

    const priceSelector = await page.locator(".price").first().textContent();
    const price = parsePrice(priceSelector);

    return { title, price };
  } finally {
    await browser.close();
  }
};

module.exports = { parse };
