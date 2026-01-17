const Contact = require("../models/Contact");

/* GET ALL CONTACTS (USER-SCOPED) */
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
