const express = require("express");
const router = express.Router();

const supabase = require("../supabase");

router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      company_name,
      address,
      gst_number,
      financial_year,
      state,
      phone,
      email,
    } = req.body;

    const { data, error } = await supabase
      .from("companies")
      .insert([
        {
          user_id,
          company_name,
          address,
          gst_number,
          financial_year,
          state,
          phone,
          email,
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
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("companies")
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
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const {
    company_name,
    address,
    gst_number,
    financial_year,
    state,
    phone,
    email,
  } = req.body;

  const { data, error } = await supabase
    .from("companies")
    .update({
      company_name,
      address,
      gst_number,
      financial_year,
      state,
      phone,
      email,
    })
    .eq("id", id)
    .select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("companies")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({
    success: true,
    message: "Company deleted successfully",
  });
});
module.exports = router;