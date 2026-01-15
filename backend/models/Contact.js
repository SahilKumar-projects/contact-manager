const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  text: String,
  createdAt: {
    type: Number,
    default: Date.now,
  },
});

const TaskSchema = new mongoose.Schema({
  text: String,
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
});

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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);
