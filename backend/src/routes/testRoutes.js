const express = require("express");
const pool = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    
    res.json({
      message: "Backend + DB funktionieren",
      time: result.rows[0]
    });
  } catch (err) {
  console.error("DB ERROR:", err);
  res.status(500).json({ error: err.message });
}
});

router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;