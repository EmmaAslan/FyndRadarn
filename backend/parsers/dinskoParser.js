const { getPage } = require("./helpers/playwright");
const { cleanText } = require("./helpers/cleanText");
const { parsePrice } = require("./helpers/parsePrice");
const { validateProduct } = require("./helpers/validateProduct");

const parse = async (url) => {
  const { browser, page } = await getPage(url);

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();

    let productData = null;

    for (const data of jsonLd) {
      try {
        const parsed = JSON.parse(data);

        if (parsed["@type"] === "Product") {
          productData = parsed;
          break;
        }
      } catch {
        continue;
      }
    }

    if (!productData) {
      throw new Error("Could not find product data in JSON-LD.");
    }

    const title = cleanText(productData.name);
    const price = Number(productData.offers?.price);

    const image = Array.isArray(productData.image) ? productData.image[0] : productData.image;

    const bodyText = await page.locator("body").innerText();

    const originalPriceMatch = bodyText.match(/Ursprungligt pris:\s*([\d\s\u202f]+)\s*kr/i);

    const originalPrice = originalPriceMatch ? parsePrice(originalPriceMatch[1]) : price;

    validateProduct(title, price, image);

    return { title, price, originalPrice, image };
  } finally {
    await browser.close();
  }
};

module.exports = { parse };
