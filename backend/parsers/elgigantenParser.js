const { getPage } = require("./helpers/playwright");
const { parsePrice } = require("./helpers/parsePrice");
const { validateProduct } = require("./helpers/validateProduct");

const parse = async (url) => {
  const { browser, page } = await getPage(url);

  try {
    const titleLocator = page.locator("h1");
    const title = await titleLocator.first().textContent();

    const priceSelector = await page.locator(".inc-vat").first().textContent();
    const price = parsePrice(priceSelector);

    const srcset = await page.locator(".swiper-pdp .swiper-items > li:first-child img").getAttribute("srcset");
    const image = srcset.split(",")[1].trim().split(" ")[0];
    const store = "Elgiganten";

    validateProduct(title, price, image);
    return { title, price, image, store };
  } finally {
    await browser.close();
  }
};

module.exports = { parse };
