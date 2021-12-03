const PORT = 8000;
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

app.use(cors());

const url = `https://${process.env.SUBDOMAIN}.zendesk.com/api/v2/tickets?page=1&per_page=25`;

axios.defaults.auth = {
  username: process.env.API_USER,
  password: process.env.API_KEY,
};

app.get("/", async (req, res) => {
  try {
    const data = await axios.get(url).then((response) => response.data);
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

app.get("/page/:number", async (req, res) => {
  const pageNumber = req.params.number;
  if (isNaN(pageNumber)) {
    res.status(400).json({ error: "Invalid parameter" });
    return;
  }
  const countUrl = `https://${process.env.SUBDOMAIN}.zendesk.com/api/v2/tickets?page=${pageNumber}&per_page=25`;
  const data = await axios
    .get(countUrl)
    .then((response) => response.data)
    .catch((error) => res.status(400).json({ error: "Bad Request" }));
  res.status(200).json(data);
});

app.listen(PORT, () =>
  console.log(`Backend Server is running on port ${PORT}`)
);
module.exports = app;
