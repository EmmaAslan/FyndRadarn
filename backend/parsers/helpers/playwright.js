const { chromium } = require("playwright");

const getPage = async (url) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(url);

  if (url.includes("amazon.")) {
    console.log("AMAZON URL:", await page.url());
    console.log("AMAZON TITLE:", await page.title());
    console.log("AMAZON TEXT:", (await page.locator("body").innerText()).slice(0, 1000));
  }

  return { browser, page };
};

module.exports = { getPage };