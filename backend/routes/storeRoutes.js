const express = require("express");
const { stores } = require("../parsers");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(stores.map(({ domain, name }) => ({ domain, name })));
});

module.exports = router;
