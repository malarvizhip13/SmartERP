const express = require("express");
const router = express.Router();

const supabase = require("../supabase");

// ➕ CREATE BILL
router.post("/", async (req, res) => {
  try {
    const { customer_name, items, total } = req.body;

    const { data, error } = await supabase
      .from("bills")
      .insert([
        {
          customer_name,
          items,
          total,
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

// 📄 GET BILLS
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("bills")
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