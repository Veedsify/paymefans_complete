const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync("public/comments/", { recursive: true });
    cb(null, "public/comments/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + uuid() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = (file) => {
  return upload.single(file);
};
