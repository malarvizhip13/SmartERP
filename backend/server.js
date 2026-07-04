const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const ledgerRoutes = require("./routes/ledgerRoutes");
const groupRoutes = require("./routes/groupRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/ledgers", ledgerRoutes);
app.use("/api/groups", groupRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "SmartERP Backend Running 🚀"
  });
});
app.get("/test", (req, res) => {
  res.json({ ok: true });
});
app.use("/api/groups", (req, res) => {
  res.json({ message: "groups middleware reached" });
});
app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});