const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const controller = require("../controllers/contact.controller");

router.use(protect);

router.get("/", controller.getContacts);
router.post("/", controller.createContact);
router.put("/:id", controller.updateContact);
router.delete("/:id", controller.deleteContact);
router.patch("/:id/favorite", protect, controller.toggleFavorite);
module.exports = router;
