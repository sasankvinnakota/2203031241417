const express = require("express");
const { nanoid } = require("nanoid");
const router = express.Router();
const { setShortLink, getShortLink, isShortCodeAvailable } = require("../utils/storage");
const { HOST } = process.env;

router.post("/shorten", (req, res) => {
  const { longUrl, shortcode, validityMinutes } = req.body;
  const validity = parseInt(validityMinutes) || 30;
  const code = shortcode || nanoid(7);

  if (!/^[a-zA-Z0-9]{4,}$/.test(code)) {
    return res.status(400).json({ error: "Invalid shortcode format" });
  }

  if (!isShortCodeAvailable(code)) {
    return res.status(409).json({ error: "Shortcode already in use" });
  }

  setShortLink(code, {
    longUrl,
    expiresAt: Date.now() + validity * 60 * 1000,
  });

  res.status(201).json({ shortUrl: `${HOST}/${code}` });
});

router.get("/:code", (req, res) => {
  const data = getShortLink(req.params.code);
  if (!data) {
    return res.status(404).json({ error: "Shortcode not found" });
  }

  if (Date.now() > data.expiresAt) {
    return res.status(410).json({ error: "Shortcode expired" });
  }

  res.redirect(data.longUrl);
});

module.exports = router;
