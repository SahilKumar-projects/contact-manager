const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: String,
    address: String,
    city: String,
    state: String,
    country: String,
  },
  { timestamps: true }
);

/* HASH PASSWORD — MONGOOSE 9 SAFE */
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

/* COMPARE PASSWORD */
UserSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model("User", UserSchema);
