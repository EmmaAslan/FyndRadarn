require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const pool = require("./config/database");

const app = express();
app.use(express.json());
app.use(routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});