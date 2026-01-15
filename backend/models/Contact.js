const mongoose = require("mongoose");

/* ---------- NOTES ---------- */
const NoteSchema = new mongoose.Schema({
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/* ---------- TASKS ---------- */
const TaskSchema = new mongoose.Schema({
  text: String,
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/* ---------- VOICEMAILS ---------- */
const VoicemailSchema = new mongoose.Schema({
  audioUrl: {
    type: String,
    required: true,
  },
  duration: Number,
  fileSize: Number,
  mimeType: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/* ---------- CONTACT ---------- */
const ContactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,

    favorite: {
      type: Boolean,
      default: false,
    },

    notes: [NoteSchema],
    tasks: [TaskSchema],

    // 🔥 THIS WAS MISSING
    voicemails: [VoicemailSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);
