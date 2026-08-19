const express = require("express");
const { previewWatchlist, createWatchlist, getWatchlists, getPriceHistory } = require("../controllers/watchlistController");

const router = express.Router();

router.post("/preview", previewWatchlist);
router.post("/", createWatchlist);
router.get("/", getWatchlists);
router.get("/:id/history", getPriceHistory);

module.exports = router;
