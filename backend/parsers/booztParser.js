const { getPage } = require("./helpers/playwright");
const { cleanText } = require("./helpers/cleanText");
const { validateProduct } = require("./helpers/validateProduct");

const parse = async (url) => {
  const { browser, page } = await getPage(url);

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const pageTitle = await page.title();

    if (pageTitle.includes("Boozt OOPS")) {
      throw new Error("Boozt blocked the request (Cloudflare).");
    }

    const variantId = new URL(url).pathname.split("/").pop();
    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();

    for (const data of jsonLd) {
      const parsed = JSON.parse(data);
      const products = parsed["@graph"] || (Array.isArray(parsed) ? parsed : [parsed]);
    }

    let productData = null;

    for (const data of jsonLd) {
      const parsed = JSON.parse(data);
      const products = parsed["@graph"] || (Array.isArray(parsed) ? parsed : [parsed]);

      const product = products.find((item) => item["@type"] === "Product" && item.sku?.endsWith(`_${variantId}`));

      if (product) {
        productData = product;
        break;
      }
    }

    if (!productData) {
      throw new Error("Could not find matching product variant.");
    }

    const title = cleanText(await page.locator("h1").first().textContent());

    const priceSpecifications = productData.offers?.priceSpecification || [];

    const currentPrice = priceSpecifications.find((item) => !item.priceType);

    const originalPrice = priceSpecifications.find((item) => item.priceType === "https://schema.org/StrikethroughPrice");

    const price = Number(currentPrice?.price);
    const regularPrice = Number(originalPrice?.price || price);

    const image = productData.image;

    validateProduct(title, price, image);

    return {
      title,
      price,
      originalPrice: regularPrice,
      image,
    };
  } finally {
    await browser.close();
  }
};

module.exports = { parse };
