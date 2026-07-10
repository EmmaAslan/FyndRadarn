const pool = require("../config/database");

const createWatchlist = async (req, res) => {
  const { email, product_url, start_price, latest_price } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO watchlists (
        email,
        product_url,
        start_price,
        latest_price
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [email, product_url, start_price, latest_price]
    );
  
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating watchlist:", error);
  
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

const getWatchlists = async (req, res) => {

  try {
    const result = await pool.query(
      `
      SELECT * FROM watchlists
      ORDER BY created_at DESC
      `
    )
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching watchlists:", error);
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};


module.exports = {
  createWatchlist,
  getWatchlists,
};