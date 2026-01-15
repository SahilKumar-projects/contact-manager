const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const controller = require("../controllers/contact.controller");

/* CONTACTS */
router.get("/", controller.getContacts);
router.post("/", controller.createContact);
router.put("/:id", controller.updateContact);
router.delete("/:id", controller.deleteContact);

/* FAVORITE */
router.patch("/:id/favorite", controller.toggleFavorite);

/* NOTES */
router.post("/:id/notes", controller.addNote);
router.delete("/:id/notes/:index", controller.deleteNote);

/* TASKS */
router.post("/:id/tasks", controller.addTask);
router.patch("/:id/tasks/:index", controller.toggleTask);
router.delete("/:id/tasks/:index", controller.deleteTask);

/* VOICEMAILS ✅ */
router.post(
  "/:id/voicemails",
  upload.single("audio"),
  controller.uploadVoicemail
);

module.exports = router;
