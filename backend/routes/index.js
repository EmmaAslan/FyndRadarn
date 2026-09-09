const express = require("express");
const watchlistRoutes = require("./watchlistRoutes");
const storeRoutes = require("./storeRoutes");

const router = express.Router();

router.use("/watchlists", watchlistRoutes);

router.get("/", (req, res) => {
  res.send("FyndRadarn backend is running!");
});

router.use("/stores", storeRoutes);

module.exports = router;
