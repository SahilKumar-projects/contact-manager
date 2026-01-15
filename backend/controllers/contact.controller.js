const Contact = require("../models/Contact");

/* -------- GET ALL -------- */
const getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
};

/* -------- CREATE -------- */
const createContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.json(contact);
};

/* -------- UPDATE -------- */
const updateContact = async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

/* -------- DELETE -------- */
const deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

/* -------- FAVORITE -------- */
const toggleFavorite = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  contact.favorite = !contact.favorite;
  await contact.save();
  res.json(contact);
};

/* -------- NOTES -------- */
const addNote = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  contact.notes.push(req.body);
  await contact.save();
  res.json(contact);
};

const deleteNote = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  contact.notes.splice(req.params.index, 1);
  await contact.save();
  res.json(contact);
};

/* -------- TASKS -------- */
const addTask = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  contact.tasks.push(req.body);
  await contact.save();
  res.json(contact);
};

const toggleTask = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  const task = contact.tasks[req.params.index];
  task.completed = !task.completed;
  await contact.save();
  res.json(contact);
};

const deleteTask = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  contact.tasks.splice(req.params.index, 1);
  await contact.save();
  res.json(contact);
};

/* -------- VOICEMAIL -------- */
const uploadVoicemail = async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  const voicemail = {
    audioUrl: `/uploads/voicemails/${req.file.filename}`,
    duration: Number(req.body.duration),
    fileSize: req.file.size,
    mimeType: req.file.mimetype,
  };

  contact.voicemails.push(voicemail);
  await contact.save();

  res.json(contact);
};

/* ✅ EXPORT EVERYTHING EXPLICITLY */
module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  toggleFavorite,
  addNote,
  deleteNote,
  addTask,
  toggleTask,
  deleteTask,
  uploadVoicemail,
};
