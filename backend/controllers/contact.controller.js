const Contact = require("../models/Contact");

/* ===================== CONTACTS ===================== */

/* GET ALL CONTACTS */
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error("GET CONTACTS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};

/* CREATE CONTACT */
exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create({
      ...req.body,
      user: req.userId,
    });
    res.status(201).json(contact);
  } catch (err) {
    console.error("CREATE CONTACT ERROR:", err);
    res.status(500).json({ message: "Failed to create contact" });
  }
};

/* UPDATE CONTACT */
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (err) {
    console.error("UPDATE CONTACT ERROR:", err);
    res.status(500).json({ message: "Failed to update contact" });
  }
};

/* DELETE CONTACT */
exports.deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("DELETE CONTACT ERROR:", err);
    res.status(500).json({ message: "Failed to delete contact" });
  }
};

/* TOGGLE FAVORITE */
exports.toggleFavorite = async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    contact.favorite = !contact.favorite;
    await contact.save();

    res.json(contact);
  } catch (err) {
    console.error("TOGGLE FAVORITE ERROR:", err);
    res.status(500).json({ message: "Failed to toggle favorite" });
  }
};

/* ===================== NOTES ===================== */

/* ADD NOTE */
exports.addNote = async (req, res) => {
  try {
    const { text } = req.body;

    const contact = await Contact.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    contact.notes.push({ text });
    await contact.save();

    res.status(201).json(contact.notes);
  } catch (err) {
    console.error("ADD NOTE ERROR:", err);
    res.status(500).json({ message: "Failed to add note" });
  }
};

/* DELETE NOTE */
exports.deleteNote = async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    contact.notes = contact.notes.filter(
      (note) => note._id.toString() !== req.params.noteId
    );

    await contact.save();
    res.json(contact.notes);
  } catch (err) {
    console.error("DELETE NOTE ERROR:", err);
    res.status(500).json({ message: "Failed to delete note" });
  }
};

/* ===================== TASKS ===================== */

/* ADD TASK */
exports.addTask = async (req, res) => {
  try {
    const { text } = req.body;

    const contact = await Contact.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    contact.tasks.push({ text });
    await contact.save();

    res.status(201).json(contact.tasks);
  } catch (err) {
    console.error("ADD TASK ERROR:", err);
    res.status(500).json({ message: "Failed to add task" });
  }
};

/* TOGGLE TASK COMPLETE */
exports.toggleTask = async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const task = contact.tasks.id(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.completed = !task.completed;
    await contact.save();

    res.json(task);
  } catch (err) {
    console.error("TOGGLE TASK ERROR:", err);
    res.status(500).json({ message: "Failed to update task" });
  }
};
