const { parse } = require("../parsers");
const pool = require("../config/database");
const { sendPriceChangeEmail } = require("./emailService");

const checkPrice = async (watchlist) => {
  const product = await parse(watchlist.product_url);
  const latestPrice = Number(watchlist.latest_price);

  return {
    hasChanged: product.price !== latestPrice,
    oldPrice: latestPrice,
    newPrice: product.price,
  };
};

const checkAllPrices = async () => {
  const result = await pool.query("SELECT * FROM watchlists");

  for (const watchlist of result.rows) {
    const priceCheckResult = await checkPrice(watchlist);

    if (priceCheckResult.hasChanged) {
      await pool.query(
        `UPDATE watchlists
        SET 
          latest_price = $2,
          last_price_change_at = NOW()
        WHERE id = $1`,
        [watchlist.id, priceCheckResult.newPrice],
      );
      await sendPriceChangeEmail(watchlist.email, watchlist.product_title, priceCheckResult.oldPrice, priceCheckResult.newPrice, watchlist.product_url);
    }
  }
};

module.exports = {
  checkPrice,
  checkAllPrices,
};
