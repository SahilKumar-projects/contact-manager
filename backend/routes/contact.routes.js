const router = require("express").Router();
const ctrl = require("../controllers/contact.controller");

router.get("/", ctrl.getContacts);
router.post("/", ctrl.createContact);
router.put("/:id", ctrl.updateContact);
router.delete("/:id", ctrl.deleteContact);

router.patch("/:id/favorite", ctrl.toggleFavorite);

/* Notes */
router.post("/:id/notes", ctrl.addNote);
router.delete("/:id/notes/:index", ctrl.deleteNote);

/* Tasks */
router.post("/:id/tasks", ctrl.addTask);
router.patch("/:id/tasks/:index", ctrl.toggleTask);
router.delete("/:id/tasks/:index", ctrl.deleteTask);

module.exports = router;
