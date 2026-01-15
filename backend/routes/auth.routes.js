const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const protect = require("../middlewares/auth.middleware");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/me", protect, controller.me);
router.put("/profile", protect, authController.updateProfile);
router.put("/change-password", protect, authController.changePassword);

module.exports = router;
