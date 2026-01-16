const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* REGISTER */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    await User.create({ name, email, password });

    res.status(201).json({
      message: "Registration successful. Please login.",
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
};

/* LOGIN */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch {
    res.status(500).json({ message: "Login failed" });
  }
};

/* ME */
exports.me = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
};

/* UPDATE PROFILE */
exports.updateProfile = async (req, res) => {
  const updated = await User.findByIdAndUpdate(
    req.userId,
    req.body,
    { new: true }
  ).select("-password");

  res.json(updated);
};

/* CHANGE PASSWORD */
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.userId).select("+password");
  if (!user || !(await user.comparePassword(currentPassword))) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  user.password = newPassword;
  await user.save();

  res.json({ message: "Password changed successfully" });
};
