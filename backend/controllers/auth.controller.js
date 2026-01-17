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

    // ✅ DO NOT hash here (model handles it)
    await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "Registration successful. Please login.",
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ error: err.message });
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
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ME */
exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* UPDATE PROFILE */
exports.updateProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.userId,
      req.body,
      { new: true }
    ).select("-password");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* CHANGE PASSWORD */
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.userId).select("+password");
    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    user.password = newPassword; // model hashes it
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
