const Contact = require("../models/Contact");

/* -------- GET ALL -------- */
exports.getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
};

/* -------- CREATE -------- */
exports.createContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.json(contact);
};

/* -------- UPDATE -------- */
exports.updateContact = async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

/* -------- DELETE -------- */
exports.deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

/* -------- TOGGLE FAVORITE -------- */
exports.toggleFavorite = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  contact.favorite = !contact.favorite;
  await contact.save();
  res.json(contact);
};

/* -------- NOTES -------- */
exports.addNote = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  contact.notes.push(req.body);
  await contact.save();
  res.json(contact);
};

exports.deleteNote = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  contact.notes.splice(req.params.index, 1);
  await contact.save();
  res.json(contact);
};

/* -------- TASKS -------- */
exports.addTask = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  contact.tasks.push(req.body);
  await contact.save();
  res.json(contact);
};

exports.toggleTask = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  const task = contact.tasks[req.params.index];
  task.completed = !task.completed;
  await contact.save();
  res.json(contact);
};

exports.deleteTask = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  contact.tasks.splice(req.params.index, 1);
  await contact.save();
  res.json(contact);
};
