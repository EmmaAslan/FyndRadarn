const { chromium } = require("playwright");

const getPage = async (url) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(url);

  return { browser, page };
};

module.exports = { getPage };