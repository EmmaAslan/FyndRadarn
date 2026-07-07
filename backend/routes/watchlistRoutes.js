const express = require("express");
const { createWatchlist } = require("../controllers/watchlistController");

const router = express.Router();

router.post("/", createWatchlist);

module.exports = router;
