require('dotenv').config();
const express = require("express");
const cors = require("cors");
const logger = require("./middleware/logger");
const shortenRoutes = require("./routes/shorten");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(logger);

app.use("/", shortenRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`URL Shortener running on port ${PORT}`);
});
