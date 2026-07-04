const express = require("express");
const router = express.Router();

const supabase = require("../supabase");

// ➕ Add Stock
router.post("/", async (req, res) => {
  try {
    const { item_name, category, quantity, price } = req.body;

    const { data, error } = await supabase
      .from("stock")
      .insert([
        {
          item_name,
          category,
          quantity,
          price,
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

// 📄 Get Stock
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("stock")
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