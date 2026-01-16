const Contact = require("../models/Contact");

/* GET ALL CONTACTS (USER-SCOPED) */
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.json(contacts);
  } catch (err) {
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
  } catch {
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
    res.json(contact);
  } catch {
    res.status(500).json({ message: "Failed to update contact" });
  }
};

/* DELETE CONTACT */
exports.deleteContact = async (req, res) => {
  try {
    await Contact.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Failed to delete contact" });
  }
};

/* TOGGLE FAVORITE */
exports.toggleFavorite = async (req, res) => {
  const contact = await Contact.findOne({
    _id: req.params.id,
    user: req.userId,
  });

  contact.favorite = !contact.favorite;
  await contact.save();
  res.json(contact);
};
