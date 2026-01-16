const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const protect = require("../middlewares/auth.middleware");

/* AUTH */
router.post("/register", authController.register);
router.post("/login", authController.login);

/* USER */
router.get("/me", protect, authController.me);
router.put("/profile", protect, authController.updateProfile);
router.put("/change-password", protect, authController.changePassword);

module.exports = router;
