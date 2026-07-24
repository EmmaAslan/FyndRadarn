const express = require("express");
const { previewWatchlist, createWatchlist, getWatchlists } = require("../controllers/watchlistController");

const router = express.Router();

router.post("/preview", previewWatchlist);
router.post("/", createWatchlist);
router.get("/", getWatchlists);

module.exports = router;
