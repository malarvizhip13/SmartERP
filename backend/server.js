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
const stockRoutes = require("./routes/stockRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const salesRoutes = require("./routes/salesRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/ledgers", ledgerRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/sales", salesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "SmartERP Backend Running 🚀" });
});

app.get("/test", (req, res) => {
  res.json({ ok: true });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});