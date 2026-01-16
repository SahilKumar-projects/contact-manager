const express = require("express");
const router = express.Router();

const auth = require("../controllers/auth.controller");
const protect = require("../middlewares/auth.middleware");

router.post("/register", auth.register);
router.post("/login", auth.login);

router.get("/me", protect, auth.me);
router.put("/profile", protect, auth.updateProfile);
router.put("/change-password", protect, auth.changePassword);

module.exports = router;
