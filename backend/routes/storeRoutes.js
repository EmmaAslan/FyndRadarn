const express = require("express");
const { stores } = require("../parsers");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(stores.map(({ domain, name, logoDomain }) => ({ domain, name, logoDomain })));
});

module.exports = router;
