const express = require("express");
const watchlistRoutes = require("./watchlistRoutes");

const router = express.Router();

router.use("/watchlists", watchlistRoutes);

router.get("/", (req, res) => {
  res.send("FyndRadarn backend is running!");
});

module.exports = router;