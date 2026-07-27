const { getPage } = require("./helpers/playwright");

const parse = async (url) => {
  const { browser, page } = await getPage(url);

  try {
    const titleLocator = page.locator("h1");
    const title = await titleLocator.first().textContent();
    const priceSelector = await page.locator("#add-product-to-cart > div.price-value._large._center > span").evaluate((el) => el.firstChild.textContent);
    const price = parseInt(priceSelector.replace(/\D/g, ""), 10);

    return { title, price };
  } finally {
    await browser.close();
  }
};

module.exports = { parse };
