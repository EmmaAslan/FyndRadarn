const express = require("express");
const { createWatchlist, getWatchlists } = require("../controllers/watchlistController");

const router = express.Router();

router.post("/", createWatchlist);
router.get("/", getWatchlists);

module.exports = router;
