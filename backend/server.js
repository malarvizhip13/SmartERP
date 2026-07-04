const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "SmartERP Backend Running 🚀"
  });
});


app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});