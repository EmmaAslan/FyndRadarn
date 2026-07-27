const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND);

const sendCreatedWatchlistEmail = async (email, productTitle, startPrice, productUrl) => {
  const result = await resend.emails.send({
    from: "FyndRadarn <onboarding@resend.dev>",
    to: email,
    subject: `You're now tracking: ${productTitle}`,
    html: `
    <h1>Price tracking is now active for this product.</h1>
    <h2>${productTitle}</h2>

    <p>Start price: <strong>${startPrice} kr</strong></p>

    <p><a href="${productUrl}">Go to product</a></p>

    `,
  });

  return result;
};

const sendPriceChangeEmail = async (email, productTitle, oldPrice, newPrice, productUrl) => {
  const result = await resend.emails.send({
    from: "FyndRadarn <onboarding@resend.dev>",
    to: email,
    subject: `Price Alert: ${productTitle}`,
    html: `
    <h1>Price change detected!</h1>
    <h2>${productTitle}</h2>

    <p>We found a new price for a product you're watching.</p>

    <p>
      Old price: <strong>${oldPrice} kr</strong><br>
      New price: <strong>${newPrice} kr</strong>
    </p>

    <p><a href="${productUrl}">Go to product</a></p>

    `,
  });

  return result;
};

module.exports = {
  sendCreatedWatchlistEmail,
  sendPriceChangeEmail,
};
