const { getPage } = require("./helpers/playwright");
const { parsePrice } = require("./helpers/parsePrice");
const { validateProduct } = require("./helpers/validateProduct");

const parse = async (url) => {
  const { browser, page } = await getPage(url);

  try {
    const titleLocator = page.locator(".pdp__product-name");
    const title = (await titleLocator.first().textContent()).trim().replace(/(^|[\s-])(\p{L})/gu, (_, separator, char) => {
      return separator + char.toUpperCase();
    });

    const priceSelector = await page.locator(".price--large").first().textContent();
    const price = parsePrice(priceSelector);

    const image = await page .locator(".pdp__swiper .swiper-slide[data-index='1'] img").first().getAttribute("src");
    const store = "Stadium";

    validateProduct(title, price, image);
    return { title, price, image, store };
  } finally {
    await browser.close();
  }
};

module.exports = { parse };
