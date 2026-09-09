const { getPage } = require("./helpers/playwright");
const { cleanText } = require("./helpers/cleanText");
const { parsePrice } = require("./helpers/parsePrice");
const { validateProduct } = require("./helpers/validateProduct");

const parse = async (url) => {
  const { browser, page } = await getPage(url);

  try {
    const titleLocator = page.locator("#productTitle");
    const title = cleanText(await titleLocator.first().textContent());

    const whole = await page.locator(".apex-pricetopay-value .a-price-whole").first().textContent();
    const fraction = await page.locator(".apex-pricetopay-value .a-price-fraction").first().textContent();
    const price = parsePrice(`${whole}${fraction}`);

    const image = (await page.locator("#landingImage").getAttribute("data-old-hires")) || (await page.locator("#landingImage").getAttribute("src"));
    const store = "Amazon";

    validateProduct(title, price, image);
    return { title, price, image, store };
  } finally {
    await browser.close();
  }
};

module.exports = { parse };
