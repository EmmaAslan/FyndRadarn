require("dotenv").config();

const cors = require("cors");
const express = require("express");

const routes = require("./routes");
const pool = require("./config/database");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});