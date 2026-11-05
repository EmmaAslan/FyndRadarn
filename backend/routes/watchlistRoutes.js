const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { previewWatchlist, createWatchlist, getWatchlists, getPriceHistory, deleteWatchlist } = require("../controllers/watchlistController");

const router = express.Router();

router.post("/preview", authMiddleware, previewWatchlist);
router.post("/", authMiddleware, createWatchlist);
router.get("/", authMiddleware, getWatchlists);
router.get("/:id/history", authMiddleware, getPriceHistory);
router.delete("/:id", authMiddleware, deleteWatchlist);

module.exports = router;
