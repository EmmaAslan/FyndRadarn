const { getPage } = require("./helpers/playwright");
const { cleanText } = require("./helpers/cleanText");
const { validateProduct } = require("./helpers/validateProduct");

const parse = async (url) => {
  const { browser, page } = await getPage(url);

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();

    const products = [];

    for (const data of jsonLd) {
      try {
        const parsed = JSON.parse(data);
        const entries = Array.isArray(parsed) ? parsed : [parsed];

        for (const entry of entries) {
          if (entry["@graph"]) {
            products.push(...entry["@graph"]);
          } else {
            products.push(entry);
          }
        }
      } catch {
        continue;
      }
    }

    const sku = new URL(url).pathname.split("/").pop();

    const productData = products.find(
      (item) => item["@type"] === "Product" && item.sku === sku
    );

    if (!productData) {
      throw new Error("Could not find product data in JSON-LD.");
    }

    const title = cleanText(productData.name);
    const price = productData.offers?.price;

    const image = Array.isArray(productData.image)
      ? productData.image[0]
      : productData.image;

    validateProduct(title, price, image);

    return { title, price, image };
  } finally {
    await browser.close();
  }
};

module.exports = { parse };