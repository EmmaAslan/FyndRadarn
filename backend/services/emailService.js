const { Resend } = require("resend");
const { cleanText } = require("../parsers/helpers/cleanText");

const resend = new Resend(process.env.RESEND);

const sendCreatedWatchlistEmail = async (email, productTitle, startPrice, productUrl) => {
  try {
    const result = await resend.emails.send({
      from: "FyndRadarn <onboarding@resend.dev>",
      to: email,
      subject: `You're now tracking: ${cleanText(productTitle)}`,
      html: `
    <h1>Price tracking is now active for this product.</h1>
    <h2>${cleanText(productTitle)}</h2>

    <p>Start price: <strong>${startPrice} kr</strong></p>

    <p><a href="${productUrl}">Go to product</a></p>

    `,
    });

    console.log(`[EMAIL] Created watchlist notification sent: ${productTitle}`);

    return result;
  } catch (error) {
    throw new Error("Email could not be sent.");
  }
};

const sendPriceChangeEmail = async (email, productTitle, oldPrice, newPrice, productUrl) => {
  try {
    const result = await resend.emails.send({
      from: "FyndRadarn <onboarding@resend.dev>",
      to: email,
      subject: `Price Alert: ${cleanText(productTitle)}`,
      html: `
    <h1>Price change detected!</h1>
    <h2>${cleanText(productTitle)}</h2>

    <p>We found a new price for a product you're watching.</p>

    <p>
      Old price: <strong>${oldPrice} kr</strong><br>
      New price: <strong>${newPrice} kr</strong>
    </p>

    <p><a href="${productUrl}">Go to product</a></p>

    `,
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
