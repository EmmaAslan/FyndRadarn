const { Resend } = require("resend");
const { cleanText } = require("../parsers/helpers/cleanText");

const fs = require("fs");
const path = require("path");

const watchlistCreatedTemplate = fs.readFileSync(path.join(__dirname, "emailTemplates", "watchlistCreated.html"), "utf8");

const priceChangeTemplate = fs.readFileSync(path.join(__dirname, "emailTemplates", "priceChange.html"), "utf8");

const resend = new Resend(process.env.RESEND);

const sendCreatedWatchlistEmail = async (email, productTitle, startPrice, productUrl, store) => {
  try {
    const html = watchlistCreatedTemplate
      .replace("{{PRODUCT_TITLE}}", cleanText(productTitle))
      .replace("{{STORE}}", store)
      .replace("{{PRICE}}", `${startPrice} kr`)
      .replace('href="{{PRODUCT_URL}}"', `href="${productUrl}"`);

    const result = await resend.emails.send({
      from: "FyndRadarn <onboarding@resend.dev>",
      to: email,
      subject: `You're now tracking: ${cleanText(productTitle)}`,
      html,
    });

    console.log(`[EMAIL] Created watchlist notification sent: ${productTitle}`);

    return result;
  } catch (error) {
    throw new Error("Email could not be sent.");
  }
};

const sendPriceChangeEmail = async (email, productTitle, oldPrice, newPrice, productUrl, store) => {
  try {
    const html = priceChangeTemplate
      .replace("{{PRODUCT_TITLE}}", cleanText(productTitle))
      .replace("{{STORE}}", store)
      .replace("{{OLD_PRICE}}", oldPrice)
      .replace("{{NEW_PRICE}}", newPrice)
      .replace("{{ARROW}}", newPrice < oldPrice ? "↓" : "↑")
      .replace('href="{{PRODUCT_URL}}"', `href="${productUrl}"`);

    const result = await resend.emails.send({
      from: "FyndRadarn <onboarding@resend.dev>",
      to: email,
      subject: `Price Alert: ${cleanText(productTitle)}`,
      html,
    });

    console.log(`[EMAIL] Price change notification sent: ${productTitle}`);

    return result;
  } catch (error) {
    throw new Error("Email could not be sent.");
  }
};

module.exports = {
  sendCreatedWatchlistEmail,
  sendPriceChangeEmail,
};
