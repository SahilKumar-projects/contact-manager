const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");


router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const LIMIT = 3;
    const skip = (page - 1) * LIMIT;

    const totalContacts = await Contact.countDocuments();

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(LIMIT);

 
    const contactsWithSerial = contacts.map((contact, index) => ({
      ...contact.toObject(),
      serial: skip + index + 1
    }));

    res.json({
      contacts: contactsWithSerial,
      currentPage: page,
      totalPages: Math.ceil(totalContacts / LIMIT),
      totalContacts
    });
  } catch (error) {
    console.error("GET ERROR:", error);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
});


router.post("/", async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    console.error("POST ERROR:", error);
    res.status(500).json({ message: "Failed to create contact" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: "Failed to delete contact" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(updatedContact);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Failed to update contact" });
  }
});

module.exports = router;
