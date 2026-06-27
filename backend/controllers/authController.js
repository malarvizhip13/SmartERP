const supabase = require("../config/supabase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password: hashedPassword }]);

  if (error) return res.json({ error });

  res.json({ message: "User Registered Successfully" });
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!data) return res.json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, data.password);

  if (!isMatch) return res.json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: data.id, email: data.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ message: "Login Success", token });
};