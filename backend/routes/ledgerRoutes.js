const express = require("express");
const router = express.Router();

const supabase = require("../supabase");

// Add Ledger
router.post("/", async (req, res) => {
  try {
    const {
      ledger_name,
      ledger_type,
      opening_balance,
      phone,
      email,
      address,
    } = req.body;

    const { data, error } = await supabase
      .from("ledgers")
      .insert([
        {
          ledger_name,
          ledger_type,
          opening_balance,
          phone,
          email,
          address,
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Ledgers
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("ledgers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;