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
    try {
      const priceCheckResult = await checkPrice(watchlist);

      if (priceCheckResult.hasChanged) {
        await sendPriceChangeEmail(watchlist.email, watchlist.product_title, priceCheckResult.oldPrice, priceCheckResult.newPrice, watchlist.product_url);

        await pool.query(
          `INSERT INTO price_history (
          watchlist_id, 
          price_before_change, 
          price_after_change,
          changed_at
          )
          VALUES ($1, $2, $3, NOW())`,
          [watchlist.id, priceCheckResult.oldPrice, priceCheckResult.newPrice],
        );

        await pool.query(
          `UPDATE watchlists
          SET 
            latest_price = $2,
            last_price_change_at = NOW()
          WHERE id = $1`,
          [watchlist.id, priceCheckResult.newPrice],
        );
      }
    } catch (error) {
      console.error(`Error checking watchlist id:${watchlist.id} - ${watchlist.product_title}:`, error);
    }
  }
};

module.exports = {
  checkPrice,
  checkAllPrices,
};
