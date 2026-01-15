const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/voicemails");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `${Date.now()}-${Math.random()}.${ext}`);
  },
});

const audioFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("audio/")) cb(null, true);
  else cb(new Error("Only audio files allowed"), false);
};

module.exports = multer({
  storage,
  fileFilter: audioFilter,
});
