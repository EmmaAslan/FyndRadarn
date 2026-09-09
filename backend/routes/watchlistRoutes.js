const express = require("express");
const { previewWatchlist, createWatchlist, getWatchlists, getPriceHistory, deleteWatchlist } = require("../controllers/watchlistController");

const router = express.Router();

router.post("/preview", previewWatchlist);
router.post("/", createWatchlist);
router.get("/", getWatchlists);
router.get("/:id/history", getPriceHistory);
router.delete("/:id", deleteWatchlist);

module.exports = router;
