const express = require("express");
const router = express.Router();

const supabase = require("../supabase");


router.post("/", async (req, res) => {
  try {
    const { group_name, group_type, description } = req.body;

    const { data, error } = await supabase
      .from("groups")
      .insert([
        {
          group_name,
          group_type,
          description,
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

// 📄 Get Groups
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("groups")
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