const express = require("express");
const router = express.Router();

const supabase = require("../supabase");

// 📊 SALES TOTAL
router.get("/sales-total", async (req, res) => {
  const { data, error } = await supabase
    .from("sales_vouchers")
    .select("quantity, price");

  if (error) return res.status(400).json({ error: error.message });

  const total = data.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  res.json({ total });
});

// 📊 PURCHASE TOTAL
router.get("/purchase-total", async (req, res) => {
  const { data, error } = await supabase
    .from("purchase_vouchers")
    .select("quantity, price");

  if (error) return res.status(400).json({ error: error.message });

  const total = data.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  res.json({ total });
});

// 📊 STOCK COUNT
router.get("/stock-summary", async (req, res) => {
  const { data, error } = await supabase
    .from("stock")
    .select("item_name, quantity");

  if (error) return res.status(400).json({ error: error.message });

  const totalItems = data.length;
  const totalQty = data.reduce((sum, item) => sum + item.quantity, 0);

  res.json({ totalItems, totalQty });
});

module.exports = router;