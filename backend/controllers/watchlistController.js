const pool = require("../config/database");
const { parse } = require("../parsers");
const { sendCreatedWatchlistEmail } = require("../services/emailService")

const previewWatchlist = async (req, res) => {
  const { product_url } = req.body;

  try {
    const { title, price } = await parse(product_url);

    res.status(200).json({
      title,
      price,
    });
  } catch (error) {
    console.error("Error fetching watchlists:", error);

    if (error.message === "This store is not supported yet.") {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (error.message === "Invalid URL.") {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (error.message === "Could not find product information.") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

const createWatchlist = async (req, res) => {
  const { email, product_url } = req.body;
  let result;

  try {
    const { title, price } = await parse(product_url);

    result = await pool.query(
      `
      INSERT INTO watchlists (
        email,
        product_url,
        start_price,
        latest_price,
        product_title
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [email, product_url, price, price, title],
    );

    await sendCreatedWatchlistEmail(email, title, price, product_url);

    res.status(201).json(result.rows[0]);


  } catch (error) {
    console.error("Error creating watchlist:", error);

    if (error.message === "Email could not be sent.") {
      await pool.query(
        "DELETE FROM watchlists WHERE id = $1",
        [result.rows[0].id],
      );

      return res.status(500).json({
        message: "The watchlist could not be created because the confirmation email could not be sent.",
      });

    }

    if (error.message === "This store is not supported yet.") {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (error.message === "Invalid URL.") {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (error.message === "Could not find product information.") {
      return res.status(400).json({
        message: error.message,
      });
    }
    
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

const getWatchlists = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({
      message: "Email is required.",
    });
  }

  try {
    const result = await pool.query(
      `
      SELECT * FROM watchlists
      WHERE email = $1
      ORDER BY created_at DESC
      `,
      [email],
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching watchlists:", error);

    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

module.exports = {
  previewWatchlist,
  createWatchlist,
  getWatchlists,
};
