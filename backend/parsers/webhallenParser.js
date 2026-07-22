const { getPage } = require("./helpers/playwright");

const parse = async (url) => {
  const { browser, page } = await getPage(url);

  const title = await page.locator("h1").textContent();
  const priceSelector = await page.locator("#add-product-to-cart > div.price-value._large._center > span").textContent();
  const price = parseInt(priceSelector.replaceAll(" ", "").replace("kr", ""), 10);

  console.log("title", title);
  console.log("price", price);

  await browser.close();

  return { title, price };
};

module.exports = { parse };
