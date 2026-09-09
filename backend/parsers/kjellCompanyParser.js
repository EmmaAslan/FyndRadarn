const { getPage } = require("./helpers/playwright");
const { cleanText } = require("./helpers/cleanText");
const { validateProduct } = require("./helpers/validateProduct");

const parse = async (url) => {
  const { browser, page } = await getPage(url);

  try {
    const productData = JSON.parse(await page.locator('script[type="application/ld+json"]').first().textContent());

    const title = cleanText(productData.name);
    const price = productData.offers.price;

    const image = await page.locator("picture img").first().getAttribute("src");

    validateProduct(title, price, image);
    return { title, price, image };
  } finally {
    await browser.close();
  }
};

module.exports = { parse };
