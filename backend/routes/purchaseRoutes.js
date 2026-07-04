const express = require("express");
const router = express.Router();

const supabase = require("../supabase");

router.post("/", async (req, res) => {
  try {
    const { supplier_name, item_name, quantity, price } = req.body;

    const { data, error } = await supabase
      .from("purchase_vouchers")
      .insert([
        {
          supplier_name,
          item_name,
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

// 📄 Get Purchases
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("purchase_vouchers")
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