require("dotenv").config();

const cors = require("cors");
const express = require("express");
const { checkAllPrices } = require("./services/priceCheckService");

const routes = require("./routes");
const pool = require("./config/database");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

const PORT = 3000;

setInterval(async () => {
  try {
    await checkAllPrices();
  } catch (error) {
    console.error(error);
  }
}, process.env.PRICE_CHECK_INTERVAL);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    await checkAllPrices();
  } catch (error) {
    console.error(error);
  }
});
